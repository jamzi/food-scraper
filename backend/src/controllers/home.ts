import * as express from "express";
import { Request, Response } from "express";
import * as puppeteer from "puppeteer";

import IControllerBase from "interfaces/IControllerBase";
import parsers from "../utils/parsers/lj";

class HomeController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.index);
  }

  index = async (req: Request, res: Response) => {
    const { id, url } = req.query;

    if (!id) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Server Error</h1><p>Unknown restaurant</p>");
      return;
    }

    let browser: puppeteer.Browser;
    try {
      browser = await puppeteer.launch({
        headless: true
      });

      const page = await browser.newPage();
      await page.setRequestInterception(true);

      page.on("request", req => {
        if (
          req.resourceType() == "stylesheet" ||
          req.resourceType() == "font" ||
          req.resourceType() == "image"
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(url);

      try {
        if (url.includes("restavracija123")) {
          await page.waitForSelector(".jed-levo", { timeout: 3000 });
        }
        const content = await page.content();

        const menuItems = parsers[id](content);
        res.json({ id: id, menuItems });
      } catch (e) {
        return undefined;
      }
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
      console.error(e.message);
    } finally {
      browser.close();
    }
  };
}

export default HomeController;
