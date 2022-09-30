const express = require("express");
const { getAllUsers, login, register } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/login", login);
usersRouter.post("/register", register);

module.exports = usersRouter;
