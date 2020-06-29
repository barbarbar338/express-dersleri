const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/signup", (req, res) => {
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    res.render("success", {
        username: username,
        password: password
    });
});

app.listen(3000, () => {
    console.log("Server port 3000'de hazır!")
});