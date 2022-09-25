const { client } = require("../index");

async function dropTable() {
  await client.query(`DROP TABLE IF EXISTS tags`);
}

async function createTable() {
  await client.query(`
    CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL
    );
    `);
}

module.exports = {
  dropTable,
  createTable,
};
