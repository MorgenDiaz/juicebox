const jwt = require("jsonwebtoken");
const { usersDbModel } = require("../../database/index");

async function getAllUsers(req, res) {
  const users = await usersDbModel.getAll();

  res.json(users);
}

function generateAuthToken(userId, username) {
  return jwt.sign(
    {
      id: userId,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1w",
    }
  );
}

async function login(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await usersDbModel.getByName(username);

    if (user && user.password == password) {
      const token = generateAuthToken(user.id, username);

      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function register(req, res, next) {
  const { username, password, name, location } = req.body;

  try {
    const existingUser = await usersDbModel.getByName(username);

    if (existingUser) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await usersDbModel.create({
      username,
      password,
      name,
      location,
    });

    const token = generateAuthToken(user.id, username);

    res.send({
      message: "thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await usersDbModel.getById(req.params.userId);

    if (user && user.id === req.user.id) {
      const updatedUser = await usersDbModel.update(user.id, {
        active: false,
      });

      res.send({ user: updatedUser });
    } else {
      next(
        user
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a user which is not yours",
            }
          : {
              name: "UserNotFoundError",
              message: "That user does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
}

module.exports = {
  getAllUsers,
  login,
  register,
  deleteUser,
};
