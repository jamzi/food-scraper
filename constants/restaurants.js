import {
  red,
  pink,
  purple,
  indigo,
  blue,
  teal,
  green,
  orange,
  brown,
  lightBlue
} from "@material-ui/core/colors";

export default [
  {
    id: "vinka",
    name: "Vinka",
    url: "https://www.vinka.si/malice-in-kosila.html",
    color: red[50]
  },
  {
    id: "gastro",
    name: "Gastro House 151",
    url: "https://www.gastrohouse.si/index.php/tedenska-ponudba",
    color: purple[50]
  },
  {
    id: "barbado",
    name: "Barbado",
    url: "http://www.barbado.si/",
    color: indigo[50]
  },
  {
    id: "piap",
    name: "Piap",
    url: "http://www.piap.si/jedilnik",
    color: blue[50]
  },
  {
    id: "favola",
    name: "Favola",
    url: "https://favola.si/",
    color: teal[50]
  },
  {
    id: "rozaSlon",
    name: "Roza Slon",
    url: "http://www.rozaslon.si/ponudba/",
    color: pink[50]
  },
  {
    id: "restavracija123",
    name: "Restavracija 123",
    url: "https://www.restavracija123.si/?restaurantid=213",
    color: green[50]
  },
  {
    id: "gostilna1987",
    name: "Gostilna 1987",
    url: "https://gostilna1987.si/",
    color: orange[50]
  },
  {
    id: "vivo",
    name: "VIVO D125",
    url: "https://www.vivo.si/vivo-d125-jedilnik/",
    color: brown[50]
  },
  {
    id: "bistroSumi",
    name: "Bistro Šumi",
    url: "https://www.studentska-prehrana.si/sl/restaurant/Details/1465",
    color: lightBlue[50]
  }
].sort((a, b) => a.name.localeCompare(b.name));
