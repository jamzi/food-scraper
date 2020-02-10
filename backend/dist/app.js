"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class App {
    constructor(appInit) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }
    middlewares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach(controller => {
            this.app.use("/", controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map