const {
  client,
  usersTable,
  postsTable,
  updatePost,
  getUserById,
} = require("../index");

const usersSeed = require("./users.seed");
const postsSeed = require("./posts.seed");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

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

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log("Starting to create users...");

    await Promise.all([
      usersSeed.createInitialData(),
      postsSeed.createInitialData(),
    ]);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function testGetAllUsers() {
  console.log("Test getAllUsers");
  const users = await usersTable.getAllUsers();
  console.log("Result: ", users);

  return users;
}

async function testUpdateUser(user) {
  console.log("Test updateUser");

  const updatedUser = await usersTable.updateUser(user.id, {
    name: "SpongeBob",
    location: "Bikini Bottom",
  });

  console.log("Result: ", updatedUser);
}

async function testGetAllPosts() {
  console.log("Test getAllPosts");
  const posts = await postsTable.getAllPosts();
  console.log("Result: ", posts);

  return posts;
}

async function testUpdatePost(post) {
  console.log("Test updatePost");

  const updatedPost = await postsTable.updatePost(post.id, {
    content: "You just kick things mostly. No wait! theres elbows too!",
  });

  console.log("Result: ", updatedPost);
}

async function testGetUserById(userId) {
  console.log("Test getUserById");

  const user = await getUserById(userId);

  console.log("Result: ", user);
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await testGetAllUsers();
    await testUpdateUser(users[2]);

    const posts = await testGetAllPosts();
    await testUpdatePost(posts[0]);

    await testGetUserById(users[1].id);

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
  console.log("here");
  client.end();
}

seed();
