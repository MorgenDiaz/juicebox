const express = require("express");
const { authenticateToken } = require("./authentication");
const usersRouter = require("./users/users.route");
const postsRouter = require("./posts/posts.route");
const tagsRouter = require("./tags/tags.route");

const apiRouter = express.Router();

apiRouter.use(authenticateToken);

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
