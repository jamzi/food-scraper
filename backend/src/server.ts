import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";

import App from "./app";

import loggerMiddleware from "./middleware/logger";

import HomeController from "./controllers/home";

dotenv.config();

const port = Number(process.env.PORT) || 5000;

const app = new App({
  port,
  controllers: [new HomeController()],
  middleWares: [express.json(), express.urlencoded(), loggerMiddleware, cors()]
});

app.listen();
