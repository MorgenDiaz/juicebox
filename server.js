require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const apiRouter = require("./route/api");
const { client } = require("./database/index");

const { PORT = 3000 } = process.env;
const server = express();

server.use(morgan("combined"));
server.use(express.json());
server.use("/api", apiRouter);

client.connect();

server.listen(PORT);
