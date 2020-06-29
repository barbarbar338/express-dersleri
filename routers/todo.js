const express = require("express");
const router = express.Router();

let todos = [
    {
        gorev: "Kahvaltı yap"
    },
    {
        gorev: "Dişlerini fırçala"
    }
];

router.get("/", (req, res) => {
    res.render("todo", {
        todos
    });
});

router.post("/", (req, res) => {
    todos.push(req.body);
    res.json(todos);
});

router.delete("/:gorev", (req, res) => {
    todos = todos.filter(todo => {
        return todo.gorev.replace(/ /g, "-") != req.params.gorev
    });
    res.json(todos);
});

module.exports = router;