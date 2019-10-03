const express = require("express");
const cors = require("cors");
const api = require("./api");

const server = express();
const port = 9999;

server.use(cors());
server.use(api);
server.listen(port, () => console.log(`API on port ${port}`));
