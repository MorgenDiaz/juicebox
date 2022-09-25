const { postsDbModel } = require("../index");

async function testGetAllPosts() {
  console.log("Test getAllPosts");

  const posts = await postsDbModel.getAll();

  console.log("Result: ", JSON.stringify(posts, null, 4));
}

async function testUpdatePost() {
  console.log("Test updatePost id: 1");

  const updatedPost = await postsDbModel.update(1, {
    content: "You just kick things mostly. No wait! theres elbows too!",
    tags: ["#youcandoanything", "#redfish", "#bluefish"],
  });

  console.log("Result: ", updatedPost);
}

async function testGetPostsByTagName() {
  console.log("Calling getPostsByTagName with #happy");

  const postsWithHappy = await postsDbModel.getByTagName("#happy");

  console.log("Result:", JSON.stringify(postsWithHappy, null, 4));
}

module.exports = { testGetAllPosts, testUpdatePost, testGetPostsByTagName };
