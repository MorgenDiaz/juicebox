const express = require("express");
const usersRouter = require("./users/users.route");
const postsRouter = require("./posts/posts.route");
const tagsRouter = require("./tags/tags.route");

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);

module.exports = apiRouter;
