const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("todo");
});

router.post("/", (req, res) => {

});

router.delete("/", (req, res) => {

});

module.exports = router;