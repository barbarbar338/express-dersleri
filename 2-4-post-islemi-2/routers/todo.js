const express = require("express");
const router = express.Router();

module.exports = (database) => {
    router.get("/", async (req, res) => {
        let todos = await database.models.todoModel.find();
        todos = todos.map(todo => {
            return {
                gorev: todo.gorev
            }
        });
        res.render("todo", {
            todos
        });
    });
    
    router.post("/", async (req, res) => {
        let todo = new database.models.todoModel({
            gorev: req.body.gorev
        });
        await todo.save();
        res.json(todo);
    });
    
    router.delete("/:gorev", (req, res) => {
        todos = todos.filter(todo => {
            return todo.gorev.replace(/ /g, "-") != req.params.gorev
        });
        res.json(todos);
    });

    return router;
}