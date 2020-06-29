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
    
    router.delete("/:gorev", async (req, res) => {
        await database.models.todoModel.deleteOne({
            gorev: decodeURIComponent(req.params.gorev)
        });
        res.json({
            success: true
        });
    });

    return router;
}