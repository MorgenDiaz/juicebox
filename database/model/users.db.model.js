class UsersDbModel {
  constructor(usersTable, postsTable, tagsTable) {
    this.usersTable = usersTable;
    this.postsTable = postsTable;
    this.tagsTable = tagsTable;
  }

  getAll = async function () {
    try {
      return await this.usersTable.getAllUsers();
    } catch (error) {
      throw error;
    }
  };

  create = async function ({ username, password, name, location }) {
    try {
      return await this.usersTable.createUser(
        username,
        password,
        name,
        location
      );
    } catch (error) {
      throw error;
    }
  };

  update = async function (id, fields = {}) {
    try {
      return await this.usersTable.updateUser(id, fields);
    } catch (error) {
      throw error;
    }
  };

  #tagUserPost = async function (post) {
    const tags = await this.tagsTable.getTagsForPost(post.id);
    post.tags = tags;
    return post;
  };

  getById = async function (userId) {
    try {
      const user = await this.usersTable.getUserById(userId);

      if (!user) return null;

      delete user.password;

      const userPosts = await this.postsTable.getPostsByUser(userId);

      const taggedUserPosts = await Promise.all(
        userPosts.map((post) => this.#tagUserPost(post))
      );

      user["posts"] = taggedUserPosts;

      return user;
    } catch (error) {
      throw error;
    }
  };

  getByName = async function (username) {
    try {
      const user = await this.usersTable.getUserByName(username);

      if (!user) return null;

      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UsersDbModel;
