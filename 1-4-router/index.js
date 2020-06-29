const express = require("express");
const app = express();

app.use("/middleware", (req, res, next) => {
    console.log(req.url);
    next();
});

app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("Merhaba Dünya!");
});

app.get("/profil/:name", (req, res) => {
    let name = req.params.name;
    res.send(`${name} kullanıcısı profili: `);
});

app.get("/profil", (req, res) => {
    let name = req.query.name;
    if (!name) return res.send("bir kullanıcı adı belirtin.");
    res.send(`${name} kullanıcısı profili: `);
});

app.use("/magaza", require("./routers/magaza.js"));

app.listen(3000, () => {
    console.log("Server port 3000'de hazır!")
});