class PostsTable {
  constructor(client) {
    this.client = client;
  }

  getPostIds = async function () {
    const { rows: postIds } = await this.client.query(`
      SELECT id
      FROM posts;
    `);

    return postIds;
  };

  updatePost = async function (id, fields) {
    const setString = Object.keys(fields)
      .filter((key) => key !== "authorId")
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length === 0) {
      return;
    }

    try {
      const {
        rows: [post],
      } = await this.client.query(
        `
        UPDATE posts
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );

      return post;
    } catch (error) {
      throw error;
    }
  };

  getPostIdsForUser = async function (userId) {
    const { rows: postIds } = await this.client.query(`
      SELECT id 
      FROM posts 
      WHERE "authorId"=${userId};
    `);

    return postIds;
  };

  insertPost = async function ({ authorId, title, content }) {
    const {
      rows: [post],
    } = await this.client.query(
      `
      INSERT INTO posts("authorId", title, content) 
      VALUES($1, $2, $3) 
      RETURNING *;
    `,
      [authorId, title, content]
    );

    return post;
  };

  getPostById = async function getPostById(postId) {
    try {
      const {
        rows: [post],
      } = await this.client.query(
        `
        SELECT *
        FROM posts
        WHERE id=$1;
      `,
        [postId]
      );

      return post;
    } catch (error) {
      throw error;
    }
  };

  getPostsByUser = async function getPostById(userId) {
    try {
      const { rows } = await this.client.query(
        `
      SELECT id, title, content, active
      FROM posts
      WHERE "authorId"=$1;
    `,
        [userId]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  };

  getPostIdsByTagName = async function (tagName) {
    try {
      const { rows: postIds } = await this.client.query(
        `
        SELECT posts.id
        FROM posts
        JOIN post_tags ON posts.id=post_tags."postId"
        JOIN tags ON tags.id=post_tags."tagId"
        WHERE tags.name=$1;
      `,
        [tagName]
      );

      return postIds;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostsTable;
