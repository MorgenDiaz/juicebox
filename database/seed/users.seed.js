const { client, usersDbModel } = require("../index");

async function dropTable() {
  await client.query(`
          DROP TABLE IF EXISTS users;
        `);
}

async function createTable() {
  await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      name varchar(255) NOT NULL,
      location varchar(255) NOT NULL,
      active BOOLEAN DEFAULT true
    );
    `);
}

async function createInitialData() {
  const albert = await usersDbModel.create({
    username: "albert",
    password: "bertie99",
    name: "Albert Malatamban",
    location: "San Luis Obispo",
  });

  const sandra = await usersDbModel.create({
    username: "sandra",
    password: "cheeky339",
    name: "Sandy Cheeks",
    location: "Bikini Bottom",
  });

  const glamgal = await usersDbModel.create({
    username: "glamgal",
    password: "glamglams",
    name: "Rhonda Regular",
    location: "Dreamland",
  });
}

module.exports = { dropTable, createTable, createInitialData };
