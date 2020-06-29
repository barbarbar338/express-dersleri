const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const handlebarshelpers = require("handlebars-helpers");
const app = express();

// Görüntü motoru ayarları
app.engine("handlebars", handlebars({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts/`,
    helpers: handlebarshelpers()
}));

app.set("views", `${__dirname}/views/`);

app.set("view engine", "handlebars");

// Static dosyalar
app.use(express.static(__dirname + "/public"));

// routerler
app.use("/todo", require("./routers/todo"));

// uygulamayı çalıştırma
app.listen(3000, () => {
    console.log("Uygulama 3000 portunda hazır!");
});