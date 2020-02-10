"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app_1 = require("./app");
const logger_1 = require("./middleware/logger");
const home_1 = require("./controllers/home");
dotenv.config();
const port = Number(process.env.PORT) || 5000;
const app = new app_1.default({
    port,
    controllers: [new home_1.default()],
    middleWares: [express.json(), express.urlencoded(), logger_1.default, cors()]
});
app.listen();
//# sourceMappingURL=server.js.map