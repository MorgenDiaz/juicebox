const express = require("express");
const { getAllTags } = require("./tags.controller");

const tagsRouter = express.Router();

tagsRouter.get("/", getAllTags);

module.exports = tagsRouter;
