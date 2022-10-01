const express = require("express");
const { requireUser } = require("../authentication");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("./posts.controller");

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", requireUser, createPost);
postsRouter.patch("/:postId", requireUser, updatePost);
postsRouter.delete("/:postId", requireUser, deletePost);

module.exports = postsRouter;
