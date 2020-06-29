const express = require("express");
const app = express();
const items = require("./items.json");

const handlebars = require("express-handlebars");
const handlebarshelpers = require("handlebars-helpers")();
const path = require("path");

app.engine("handlebars", handlebars({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts/`,
    helpers: handlebarshelpers
}));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/market", (req, res) => {

    let item = req.query.item ? items.filter(i => i.name == req.query.item) ? items.filter(i => i.name == req.query.item)[0] : null : null;

    res.render("market", {
        allItems: items,
        item: item
    });
});

app.listen(3000, () => {
    console.log("Server port 3000'de hazır!")
});