const cheerio = require("cheerio");

function vinka(response) {
  const $ = cheerio.load(response, { decodeEntities: false });
  const menuItems = $(".col-md-9 > p")
    .html()
    .replace("<br>", "\n")
    .split("Poletna ponudba")[0]
    .split("<br>");

  return menuItems;
}

function gastro(response) {
  const $ = cheerio.load(response, { decodeEntities: false });

  const menuItems = [];
  $(`.futr li`).each((i, elm) => {
    menuItems.push($(elm).text());
  });

  return menuItems;
}

function restavracija123(data) {
  const $ = cheerio.load(data);
  const menuItems = $(".jed-levo")
    .map((i, el) => {
      const title = $(el).find(".jed-title").text();
      return title;
    })
    .get();

  return menuItems;
}

function favola(response) {
  const $ = cheerio.load(response, { decodeEntities: false });

  const menuItems = $(`.elementor-text-editor > p`)
    .map((i, el) => {
      return $(el)
        .html()
        .replace(/<br>/g, " ")
        .replace(/<[^>]*>/g, "");
    })
    .get();

  return menuItems;
}

function piap(response) {
  const $ = cheerio.load(response);
  const menuItems = $(".j_text_naslov")
    .map((i, el) => {
      return $(el).text();
    })
    .get();

  return menuItems;
}

function barbado(response) {
  const $ = cheerio.load(response);
  const menuItems = $(".text_exposed_root.text_exposed:nth-child(3) > p")
    .map((i, el) => {
      return $(el).text();
    })
    .get();

  return menuItems;
}

function rozaSlon(response) {
  const $ = cheerio.load(response);

  const menuItems = [];
  const blocks = ["avia-builder-el-13", "avia-builder-el-27"];

  blocks.forEach((block) => {
    $(`.${block} > .av-catalogue-list li`).each((i, elm) => {
      const title = $(elm).find(".av-catalogue-title").text();
      const description = $(elm).find(".av-catalogue-content").text().trim();
      const price = $(elm).find(".av-catalogue-price").text();

      menuItems.push(`${title} (${description}) ${price}`);
    });
  });

  return menuItems;
}

function gostilna1987(response) {
  const $ = cheerio.load(response);

  const menuItems = $(".is-selected .wpb_wrapper > p")
    .map((i, el) => {
      return $(el).text().replace(/\*/g, "");
    })
    .get();

  return menuItems.slice(1, menuItems.length);
}

function vivo(response) {
  const $ = cheerio.load(response);

  const daySelector = {
    1: "#post-3154 > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div.wpb_text_column.wpb_content_element > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div.wpb_wrapper > div > div > div:nth-child(2)",
    2: "#post-3154 > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div.wpb_text_column.wpb_content_element > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div.wpb_wrapper > div > div > div:nth-child(2)",
    3: "#post-3154 > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div.wpb_text_column.wpb_content_element > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
    4: "#post-3154 > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div.wpb_text_column.wpb_content_element > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(4)",
    5: "#post-3154 > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div.wpb_text_column.wpb_content_element > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(4) > div:nth-child(7)",
  };

  const currentDate = new Date();
  const dateOfTheWeek = currentDate.getDay();

  const menuItems = [];
  $(`${daySelector[dateOfTheWeek]} > p`).each((i, elm) => {
    const title = $(elm).text().trim();
    if (title) {
      menuItems.push(title);
    }
  });
  return menuItems;
}

function bistroSumi(response) {
  const $ = cheerio.load(response, { decodeEntities: false });

  const menuItems = $(`#menu-list > .shadow-wrapper`)
    .map((i, el) => {
      const title = $(el).find(".color-blue").text();
      return title;
    })
    .get();

  return menuItems;
}

module.exports = {
  vinka,
  gastro,
  restavracija123,
  favola,
  piap,
  barbado,
  rozaSlon,
  gostilna1987,
  vivo,
  bistroSumi,
};
