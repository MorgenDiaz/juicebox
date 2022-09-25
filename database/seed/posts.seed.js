const { client, postsDbModel } = require("../index");

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
  await postsDbModel.create({
    authorId: 1,
    title: "The Art Of Muay Thai",
    content: "You just kick things mostly.",
    tags: ["#happy", "#youcandoanything"],
  });

  await postsDbModel.create({
    authorId: 1,
    title: "Music in town",
    content: "Where is it at?.",
    tags: ["#happy", "#worst-day-ever"],
  });

  await postsDbModel.create({
    authorId: 2,
    title: "Kay Rah Tay ",
    content: "Judo chop.",
    tags: ["#happy", "#youcandoanything", "#canmandoeverything"],
  });

  await postsDbModel.create({
    authorId: 3,
    title: "Hi",
    content: "hehehe.",
    tags: ["#happy", "#canmandoeverything"],
  });
}

module.exports = { dropTable, createTable, createInitialData };
