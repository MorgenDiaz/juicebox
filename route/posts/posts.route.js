const express = require("express");
const { getAllPosts } = require("./posts.controller");

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);

module.exports = postsRouter;
