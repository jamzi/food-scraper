const chrome = require("chrome-aws-lambda");

const isProd = process.env.NODE_ENV === "production";
let puppeteer;
if (isProd) {
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

const parsers = require("./parsers/lj");

const requestUrls = {
  vinka: "https://www.vinka.si/malice-in-kosila.html",
  gastro: "https://www.gastrohouse.si/index.php/tedenska-ponudba",
  restavracija123: "https://www.restavracija123.si/?restaurantid=213",
  barbado: "http://www.barbado.si/",
  piap: "http://www.piap.si/jedilnik",
  favola: "http://www.kaval-group.si/FAVOLA,,ponudba/kosila",
  rozaSlon: "http://www.rozaslon.si/ponudba/",
  gostilna1987: "https://gostilna1987.si/",
  vivo: "https://www.vivo.si/vivo-d125-jedilnik/"
};

module.exports = async function(req, res) {
  const { restaurantId } = req.query;
  const url = requestUrls[restaurantId];

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
      if (url === "https://www.restavracija123.si/?restaurantid=213") {
        await page.waitForSelector(".jed-levo", { timeout: 3000 });
      }
      const content = await page.content();
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
};
