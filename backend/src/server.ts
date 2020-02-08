import * as express from "express";
import * as cors from "cors";

import App from "./app";

import loggerMiddleware from "./middleware/logger";

import HomeController from "./controllers/home";

const app = new App({
  port: 5000,
  controllers: [new HomeController()],
  middleWares: [express.json(), express.urlencoded(), loggerMiddleware, cors()]
});

app.listen();
