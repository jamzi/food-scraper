import chrome from "chrome-aws-lambda";

const isProd = process.env.NODE_ENV === "production";
let puppeteer;
if (isProd) {
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

import parsers from "./parsers/lj";
import resturants from "../constants/restaurants";

export default async function(req, res) {
  const { restaurantId } = req.query;

  const restaurant = resturants.find(r => r.id === restaurantId);
  if (!restaurant) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Server Error</h1><p>Unknown restaurant</p>");
  }
  console.log("restaurant:", restaurant);

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
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

    console.log("restaurant.url:", restaurant.url);
    await page.goto(restaurant.url);

    try {
      if (url === "https://www.restavracija123.si/?restaurantid=213") {
        await page.waitForSelector(".jed-levo", { timeout: 3000 });
      }
      const content = await page.content();
      console.log("content:", content);
      const data = parsers[restaurantId](content);
      res.json(data);
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
}
