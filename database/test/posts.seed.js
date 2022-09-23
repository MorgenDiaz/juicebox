const { client, createPost, postsTable } = require("../index");

async function dropTable() {
  await client.query(`DROP TABLE IF EXISTS posts`);
}

async function createTable() {
  await client.query(`
        CREATE TABLE posts(
            id SERIAL PRIMARY KEY,
            "authorId" INTEGER REFERENCES users(id) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            active BOOLEAN DEFAULT true
        )
    `);
}

async function createInitialData() {
  await postsTable.createPost({
    authorId: 1,
    title: "The Art Of Muay Thai",
    content: "You just kick things mostly.",
  });
}

module.exports = { dropTable, createTable, createInitialData };
