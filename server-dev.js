import express from "express";
import cors from "cors";
import api from "./api";

const server = express();
const port = 9999;

server.use(cors());
server.use(api);
server.listen(port, () => console.log(`API on port ${port}`));
