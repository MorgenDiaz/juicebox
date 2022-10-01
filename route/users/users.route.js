const express = require("express");
const { requireUser } = require("../authentication");
const {
  getAllUsers,
  login,
  register,
  deleteUser,
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.delete("/:userId", requireUser, deleteUser);

module.exports = usersRouter;
