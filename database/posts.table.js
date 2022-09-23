class PostsTable {
  constructor(client) {
    this.client = client;
  }

  getAllPosts = async function () {
    const { rows } = await this.client.query(`SELECT * FROM posts;`);

    return rows;
  };

  createPost = async function ({ authorId, title, content }) {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  updatePost = async function (id, fields = {}) {
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

  getPostsByUser = async function (userId) {
    try {
      const { rows } = await this.client.query(`
        SELECT * FROM posts
        WHERE "authorId"=${userId};
      `);

      return rows;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostsTable;
