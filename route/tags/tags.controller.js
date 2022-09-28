const { tagsDbModel } = require("../../database");

async function getAllTags(req, res) {
  const tags = await tagsDbModel.getAll();

  res.json(tags);
}

module.exports = { getAllTags };
