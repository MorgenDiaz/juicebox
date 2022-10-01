const { postsDbModel } = require("../../database/index");

function parseTags(tagsStr) {
  return tagsStr.trim().split(/\s+/);
}

async function getAllPosts(req, res) {
  const allPosts = await postsDbModel.getAll();

  const posts = allPosts.filter((post) => {
    return (
      (post.active && post.author.active) ||
      (req.user && post.author.id === req.user.id)
    );
  });

  res.json(posts);
}

async function createPost(req, res, next) {
  const { title, content, tags = "" } = req.body;

  const tagArr = parseTags(tags);
  const postData = {};

  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.authorId = req.user.id;
    postData.title = title;
    postData.content = content;
    const post = await postsDbModel.create(postData);

    if (post) {
      res.send({ post });
    } else {
      next({
        name: "CouldNotCreatPostError",
        message: "There was an issue creating your post.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
}

async function updatePost(req, res, next) {
  const { postId } = req.params;
  const { title, content, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = parseTags(tags);
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await postsDbModel.getById(postId);

    if (originalPost.author.id === req.user.id) {
      const updatedPost = await postsDbModel.update(postId, updateFields);
      res.send({ post: updatedPost });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
}

async function deletePost(req, res, next) {
  try {
    const post = await postsDbModel.getById(req.params.postId);

    if (post && post.author.id === req.user.id) {
      const updatedPost = await postsDbModel.update(post.id, {
        active: false,
      });

      res.send({ post: updatedPost });
    } else {
      next(
        post
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a post which is not yours",
            }
          : {
              name: "PostNotFoundError",
              message: "That post does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
