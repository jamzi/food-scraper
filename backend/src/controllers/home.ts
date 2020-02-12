import * as express from "express";
import { Request, Response } from "express";
import * as puppeteer from "puppeteer";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

import IControllerBase from "interfaces/IControllerBase";
import parsers from "../utils/parsers/lj";
import restaurants from "../../../frontend/constants/restaurants";
import Restaurant from "../../../frontend/models/Restaurant";

class HomeController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  public adapter = new FileSync("db.json");
  public db = lowdb(this.adapter);

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.index);
    this.router.get("/scrape", this.scrape);
  }

  index = async (req: Request, res: Response) => {
    const values: Restaurant[] = await this.db.get("restaurants").value();

    const { id } = req.query;
    const restaurant = values.find(v => v.id === id);

    res.status(200).send(restaurant);
  };

  scrape = async (req: Request, res: Response) => {
    let browser: puppeteer.Browser;
    try {
      browser = await puppeteer.launch({
        headless: true
      });

      const data = [];
      const requests = restaurants.map(async restaurant => {
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

        await page.goto(restaurant.url);

        if (restaurant.url.includes("restavracija123")) {
          await page.waitForSelector(".jed-levo", { timeout: 3000 });
        }
        const content = await page.content();

        const menuItems = parsers[restaurant.id](content);
        data.push({ id: restaurant.id, menuItems });

        await page.close();
      });

      await Promise.all(requests).then(() => {
        browser.close();
      });

      await this.db.set("restaurants", data).write();
      res.status(200).send(`Scraped ${data.length} restaurants`);
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
