const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
const handlebarshelpers = require("handlebars-helpers")();
const path = require("path");

app.use("/middleware", (req, res, next) => {
    console.log(req.url);
    next();
});

app.use("/", express.static(__dirname + "/public"));

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

app.get("/profil/:name", (req, res) => {
    let name = req.params.name;
    res.render("profil", {
        name: name
    });
});

app.get("/profil", (req, res) => {
    let name = req.query.name;
    if (!name) return res.send("bir kullanıcı adı belirtin.");
    res.render("profil", {
        name: name
    });
});

app.use("/magaza", require("./routers/magaza.js"));

app.listen(3000, () => {
    console.log("Server port 3000'de hazır!")
});