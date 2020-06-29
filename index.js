const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const handlebarshelpers = require("handlebars-helpers");
const Mongoose = require("mongoose");
const app = express();

Mongoose.connect("MONGODB_BAĞLANTI_URLSİ", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = Mongoose.connection;

// Görüntü motoru ayarları
app.engine("handlebars", handlebars({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts/`,
    helpers: handlebarshelpers()
}));

app.set("views", `${__dirname}/views/`);

app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// Static dosyalar
app.use(express.static(__dirname + "/public"));

// routerler
app.use("/todo", require("./routers/todo")(database));

// uygulamayı çalıştırma
database.once("open", () => {
    require("./todoModel");
    app.listen(3000, () => {
        console.log("Uygulama 3000 portunda hazır!");
    });
});
