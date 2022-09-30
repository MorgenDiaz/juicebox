const { usersDbModel } = require("../index");

async function testGetAllUsers() {
  console.log("Test getAllUsers");
  const users = await usersDbModel.getAll();
  console.log("Result: ", users);
}

async function testUpdateUser(user) {
  console.log("Test updateUser id: 3");

  const updatedUser = await usersDbModel.update(3, {
    name: "SpongeBob",
    location: "Bikini Bottom",
  });

  console.log("Result: ", updatedUser);
}

async function testGetUserById(userId) {
  console.log("Test getUserById id: 2");

  const user = await usersDbModel.getById(2);

  console.log("Result: ", JSON.stringify(user, null, 4));
}

module.exports = { testGetAllUsers, testUpdateUser, testGetUserById };
