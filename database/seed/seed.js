const { client } = require("../index");

const {
  testGetAllUsers,
  testUpdateUser,
  testGetUserById,
} = require("../test/users.tests");

const {
  testGetAllPosts,
  testUpdatePost,
  testGetPostsByTagName,
} = require("../test/posts.tests");

const usersSeed = require("./users.seed");
const postsSeed = require("./posts.seed");
const tagsSeed = require("./tags.seed");
const postTagsSeed = require("./post_tags.seed");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await postTagsSeed.dropTable();
    await tagsSeed.dropTable();
    await postsSeed.dropTable();
    await usersSeed.dropTable();

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await usersSeed.createTable();
    await postsSeed.createTable();
    await tagsSeed.createTable();
    await postTagsSeed.createTable();

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log("Starting to populate tables");

    await usersSeed.createInitialData();
    await postsSeed.createInitialData();

    console.log("Finished populating tables");
  } catch (error) {
    console.error("Error populating tables");
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    await testGetAllUsers();
    await testUpdateUser();

    await testGetAllPosts();
    await testUpdatePost();

    await testGetUserById();

    await testGetPostsByTagName();

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

async function seed() {
  await client.connect();
  await rebuildDB();
  await testDB();
  client.end();
}

seed();
