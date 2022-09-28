const { postsDbModel } = require("../../database/index");

async function getAllPosts(req, res) {
  const posts = await postsDbModel.getAll();

  res.json(posts);
}

module.exports = {
  getAllPosts,
};
