const jwt = require("jsonwebtoken");
const { usersDbModel } = require("../database");
const { JWT_SECRET } = process.env;

async function authenticateToken(req, res, next) {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await usersDbModel.getById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
}

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireActiveUser(req, res, next) {
  if (!req.user.active) {
    next({
      name: "InactiveUserError",
      message: "You must be logged with an active user to perform this action",
    });
  }

  next();
}

module.exports = { authenticateToken, requireUser, requireActiveUser };
