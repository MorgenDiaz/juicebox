class PostsDbModel {
  constructor(postsTable, tagsTable, postTagsTable, usersTable) {
    this.postsTable = postsTable;
    this.tagsTable = tagsTable;
    this.postTagsTable = postTagsTable;
    this.usersTable = usersTable;
  }

  getById = async function (postId) {
    try {
      const post = await this.postsTable.getPostById(postId);
      const tags = await this.tagsTable.getTagsForPost(postId);
      const author = await this.usersTable.getUserById(post.authorId);

      delete author.password;
      delete author.active;
      delete post.authorId;

      post.tags = tags;
      post.author = author;

      return post;
    } catch (error) {
      throw error;
    }
  };

  getAll = async function () {
    const postIds = await this.postsTable.getPostIds();

    const posts = await Promise.all(
      postIds.map((post) => this.getById(post.id))
    );

    return posts;
  };

  getByUser = async function (userId) {
    try {
      const postIds = await this.postsTable.getPostIdsForUser(userId);

      const posts = await Promise.all(
        postIds.map((post) => this.getById(post.id))
      );

      return posts;
    } catch (error) {
      throw error;
    }
  };

  getByTagName = async function (tagName) {
    try {
      const postIds = await this.postsTable.getPostIdsByTagName(tagName);

      return await Promise.all(postIds.map((post) => this.getById(post.id)));
    } catch (error) {
      throw error;
    }
  };

  addTags = async function (postId, tagList) {
    try {
      const createPostTagPromises = tagList.map((tag) =>
        this.postTagsTable.createPostTag(postId, tag.id)
      );

      await Promise.all(createPostTagPromises);

      return await this.getById(postId);
    } catch (error) {
      throw error;
    }
  };

  create = async function ({ authorId, title, content, tags }) {
    try {
      const post = await this.postsTable.insertPost({
        authorId,
        title,
        content,
      });

      const tagList = await this.tagsTable.createTags(tags);

      return await this.addTags(post.id, tagList);
    } catch (error) {
      throw error;
    }
  };

  update = async function (id, fields = {}) {
    try {
      const tags = fields.tags;
      delete fields.tags;

      await this.postsTable.updatePost(id, fields);

      if (tags === undefined) {
        return await this.getById(id);
      }

      const tagList = await this.tagsTable.createTags(tags);

      this.postTagsTable.deletePostTagsForPostNotMatchingIds(
        id,
        tagList.map((tag) => tag.id)
      );

      await this.addTags(id, tagList);

      return await this.getById(id);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostsDbModel;
