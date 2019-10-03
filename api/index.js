const chrome = require("chrome-aws-lambda");

const isProd = process.env.NODE_ENV === "production";
let puppeteer;
if (isProd) {
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

const parsers = require("./parsers/lj");

module.exports = async function(req, res) {
  const { id, url } = req.query;

  if (!id) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Server Error</h1><p>Unknown restaurant</p>");
  }

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

    await page.goto(url);

    try {
      if (url === "https://www.restavracija123.si/?id=213") {
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
