const express = require("express");
const { getAllTags, getPostsByTagName } = require("./tags.controller");

const tagsRouter = express.Router();

tagsRouter.get("/", getAllTags);
tagsRouter.get("/:tagName/posts", getPostsByTagName);

module.exports = tagsRouter;
