"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class HomeController {
    constructor() {
        this.path = "/";
        this.router = express.Router();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send("🎉 Hello TypeScript! 🎉");
            // const { id, url } = req.query;
            // if (!id) {
            //   res.statusCode = 500;
            //   res.setHeader("Content-Type", "text/html");
            //   res.end("<h1>Server Error</h1><p>Unknown restaurant</p>");
            //   return;
            // }
            // let browser: puppeteer.Browser;
            // try {
            //   browser = await puppeteer.launch({
            //     headless: true
            //   });
            //   const page = await browser.newPage();
            //   await page.setRequestInterception(true);
            //   page.on("request", req => {
            //     if (
            //       req.resourceType() == "stylesheet" ||
            //       req.resourceType() == "font" ||
            //       req.resourceType() == "image"
            //     ) {
            //       req.abort();
            //     } else {
            //       req.continue();
            //     }
            //   });
            //   await page.goto(url);
            //   try {
            //     if (url.includes("restavracija123")) {
            //       await page.waitForSelector(".jed-levo", { timeout: 3000 });
            //     }
            //     const content = await page.content();
            //     const menuItems = parsers[id](content);
            //     res.json({ id: id, menuItems });
            //   } catch (e) {
            //     return undefined;
            //   }
            // } catch (e) {
            //   res.statusCode = 500;
            //   res.setHeader("Content-Type", "text/html");
            //   res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
            //   console.error(e.message);
            // } finally {
            //   browser.close();
            // }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", this.index);
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.js.map