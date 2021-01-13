"use strict";
const replaceHtml = require("./modules/replaceHtml");
const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
let jsonFile = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
let jsonFileObj = JSON.parse(jsonFile);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const cardsTemplate = fs.readFileSync(
  `${__dirname}/templates/cards.html`,
  "utf-8"
);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (req.url === "/" || req.url === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    let cards = jsonFileObj
      .map((ele) => replaceHtml(cardsTemplate, ele))
      .join("");
    let output = overviewTemplate.replace(/{%cards%}/g, cards);
    res.end(output);
  } else if (req.url === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(jsonFile);
  } else if (pathname === "/product") {
    let output = replaceHtml(productTemplate, jsonFileObj[query.id]);
    res.end(output);
  } else {
    res.writeHead(404);
    res.end("Error occoured");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("server called");
});
