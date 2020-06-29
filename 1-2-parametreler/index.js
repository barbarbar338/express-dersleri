const express = require("express");
const app = express();

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

app.listen(3000, () => {
    console.log("Server port 3000'de hazır!")
});