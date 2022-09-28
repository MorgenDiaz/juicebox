const { usersDbModel } = require("../../database/index");

async function getAllUsers(req, res) {
  const users = await usersDbModel.getAll();

  res.json(users);
}

module.exports = {
  getAllUsers,
};
