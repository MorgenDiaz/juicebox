const { tagsDbModel, postsDbModel } = require("../../database");

async function getAllTags(req, res) {
  const tags = await tagsDbModel.getAll();

  res.json(tags);
}

async function getPostsByTagName(req, res, next) {
  const { tagName } = req.params;
  try {
    const allPostsWithTag = await postsDbModel.getByTagName(tagName);

    const posts = allPostsWithTag.filter((post) => {
      return post.active || (req.user && post.author.id === req.user.id);
    });

    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
}

module.exports = { getAllTags, getPostsByTagName };
