const { Client } = require("pg");
const UsersTable = require("./users.table");
const PostsTable = require("./posts.table");

const client = new Client("postgres://localhost:5432/juicebox-dev");

const users = new UsersTable(client);
const postsTable = new PostsTable(client);

getUserById = async function (userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT * FROM users
        WHERE "id"=${userId};
      `);

    if (!user) return null;

    delete user.password;

    const userPosts = await postsTable.getPostsByUser(userId);
    user["posts"] = userPosts;

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  client,
  usersTable: users,
  postsTable,
  getUserById,
};
