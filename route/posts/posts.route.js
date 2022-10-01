const express = require("express");
const { requireUser, requireActiveUser } = require("../authentication");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("./posts.controller");

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", requireUser, requireActiveUser, createPost);
postsRouter.patch("/:postId", requireUser, requireActiveUser, updatePost);
postsRouter.delete("/:postId", requireUser, requireActiveUser, deletePost);

module.exports = postsRouter;
