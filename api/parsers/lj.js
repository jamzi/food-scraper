const cheerio = require("cheerio");

function vinka(response) {
  const $ = cheerio.load(response, { decodeEntities: false });
  const menuItems = $(".col-md-9 > p")
    .html()
    .replace("<br>", "\n")
    .split("Poletna ponudba")[0]
    .split("<br>");

  return {
    id: "vinka",
    name: "Vinka",
    menuItems
  };
}

function gastro(response) {
  const $ = cheerio.load(response, { decodeEntities: false });

  const menuItems = [];
  $(`.futr li`).each((i, elm) => {
    menuItems.push($(elm).text());
  });

  return {
    id: "gastro",
    name: "Gastro House 151",
    menuItems
  };
}

function restavracija123(data) {
  const $ = cheerio.load(data);
  return {
    id: "restavracija123",
    name: "Restavracija 123",
    menuItems: $(".jed-levo")
      .map((i, el) => {
        const title = $(el)
          .find(".jed-title")
          .text();
        return title;
      })
      .get()
  };
}

function favola(response) {
  const currentDate = new Date();
  const dateOfTheWeek = currentDate.getDay();

  const $ = cheerio.load(response, { decodeEntities: false });
  return {
    id: "favola",
    name: "Favola",
    menuItems: $(`.show.show-${dateOfTheWeek - 1} > p`)
      .map((i, el) => {
        return i % 2 === 0 ? $(el).html() : "";
      })
      .get()
  };
}

function piap(response) {
  const $ = cheerio.load(response);
  const menuItems = $(".j_text_naslov")
    .map((i, el) => {
      return $(el).text();
    })
    .get();

  return {
    id: "piap",
    name: "Piap",
    menuItems
  };
}

function barbado(response) {
  const $ = cheerio.load(response);
  const menuItems = $(".text_exposed_root.text_exposed:nth-child(3) > p")
    .map((i, el) => {
      return $(el).text();
    })
    .get();

  return {
    id: "barbado",
    name: "Barbado",
    menuItems
  };
}

function rozaSlon(response) {
  const $ = cheerio.load(response);

  const menuItems = [];
  const blocks = ["avia-builder-el-13", "avia-builder-el-27"];

  blocks.forEach(block => {
    $(`.${block} > .av-catalogue-list li`).each((i, elm) => {
      const title = $(elm)
        .find(".av-catalogue-title")
        .text();
      const description = $(elm)
        .find(".av-catalogue-content")
        .text()
        .trim();
      const price = $(elm)
        .find(".av-catalogue-price")
        .text();

      menuItems.push(`${title} (${description}) ${price}`);
    });
  });

  return {
    id: "rozaSlon",
    name: "Roza Slon",
    menuItems
  };
}

function gostilna1987(response) {
  const $ = cheerio.load(response);

  const menuItems = $(".is-selected .wpb_wrapper > p")
    .map((i, el) => {
      return $(el)
        .text()
        .replace(/\*/g, "");
    })
    .get();

  return {
    id: "gostilna1987",
    name: "Gostilna 1987",
    menuItems: menuItems.slice(1, menuItems.length)
  };
}

module.exports = {
  vinka,
  gastro,
  restavracija123,
  favola,
  piap,
  barbado,
  rozaSlon,
  gostilna1987
};
