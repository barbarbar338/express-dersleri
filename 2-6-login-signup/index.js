const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const handlebarshelpers = require("handlebars-helpers");
const Mongoose = require("mongoose");
const session = require("express-session");
const randomString = require("random-string");
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

app.use(session({
	secret: "shh-this-is-a-secret",
	resave: true,
	saveUninitialized: true
}));

app.get("/", (req, res) => {
    if (req.session.user) return res.redirect("/todo");
    res.render("index");
});

app.post("/signup", async (req, res) => {
    if (req.session.user) return res.redirect("/todo");

    if (!req.body.username) return res.json({
        error: true,
        message: "Kullanıcı adı belirtin."
    });

    if (!req.body.password) return res.json({
        error: true,
        message: "Şifre belirtin."
    });

    let username = req.body.username;
    let password = req.body.password;

    let RegToken = /^[a-zA-Z0-9_]*$/;

    if (!RegToken.test(username)) return res.json({
        error: true,
        message: "Kullanıcı adınız alfa-numerik karakterletden oluşabilir"
    });

    if (!RegToken.test(password)) return res.json({
        error: true,
        message: "Şifreniz alfa-numerik karakterletden oluşabilir"
    });

    let exists = await database.models.userModel.findOne({
        username
    });

    if (exists) return res.json({
        error: true,
        message: "Bu kullanıcı adı daha önce alınmış"
    });

    let id = randomString({
        length: 40
    })

    let user = new database.models.userModel({
        username,
        password,
        id 
    });

    await user.save();

    req.session.user = {
        username,
        password,
        id
    }

    res.redirect("/todo");
});

app.post("/login", async (req, res) => {
    if (req.session.user) return res.redirect("/todo");

    if (!req.body.username) return res.json({
        error: true,
        message: "Kullanıcı adı belirtin."
    });

    if (!req.body.password) return res.json({
        error: true,
        message: "Şifre belirtin."
    });

    let username = req.body.username;
    let password = req.body.password;

    let user = await database.models.userModel.findOne({
        username,
        password
    });

    if (!user) return res.json({
        error: true,
        message: "Böyle bir kullanıcı bulunamadı."
    });

    req.session.user = user

    res.redirect("/todo");

});

// routerler
app.use("/todo", require("./routers/todo")(database));

// uygulamayı çalıştırma
database.once("open", () => {
    require("./todoModel");
    require("./userModel");
    app.listen(3000, () => {
        console.log("Uygulama 3000 portunda hazır!");
    });
});
