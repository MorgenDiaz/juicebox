const { Client } = require("pg");
const UsersTable = require("./table/users.table");
const PostsTable = require("./table/posts.table");
const TagsTable = require("./table/tags.table");
const PostTagsTable = require("./table/post_tags.table");
const PostsDbModel = require("./model/posts.db.model");
const UsersDbModel = require("./model/users.db.model");
const TagsDbModel = require("./model/tags.db.model");

const client = new Client("postgres://localhost:5432/juicebox-dev");

const usersTable = new UsersTable(client);
const postsTable = new PostsTable(client);
const tagsTable = new TagsTable(client);
const postTagsTable = new PostTagsTable(client);

const postsDbModel = new PostsDbModel(
  postsTable,
  tagsTable,
  postTagsTable,
  usersTable
);

const usersDbModel = new UsersDbModel(usersTable, postsTable, tagsTable);

const tagsDbModel = new TagsDbModel(tagsTable);

module.exports = {
  client,
  postsDbModel,
  usersDbModel,
  tagsDbModel,
};
