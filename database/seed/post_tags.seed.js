const { client } = require("../index");

async function dropTable() {
  await client.query(`DROP TABLE IF EXISTS post_tags`);
}

async function createTable() {
  await client.query(`CREATE TABLE post_tags (
            "postId" INTEGER REFERENCES posts(id),
            "tagId" INTEGER REFERENCES tags(id),
            UNIQUE("postId", "tagId")
        );`);
}

module.exports = {
  dropTable,
  createTable,
};
