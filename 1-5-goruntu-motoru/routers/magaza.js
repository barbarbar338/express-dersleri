const { Router } = require("express");
const router = Router();

router.use((req, res, next) => {
    console.log(req.url);
    next();
});

router.get("/", (req, res) => {
    res.send("Mağazamıza hoş geldiniz.");
});

router.get("/esya", (req, res) => {
    let price = req.query.price;
    let name = req.query.name;
    res.send(`Ürün: ${name} - Fiyat: ${price} TL`);
});

module.exports = router;