const express = require("express");
const router = express.Router();

module.exports = (database) => {
    router.get("/", async (req, res) => {
        if (!req.session.user) return res.redirect("/");
        let todos = await database.models.todoModel.find({
            sahip: req.session.user.id
        });
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
        if (!req.session.user) return res.redirect("/");
        
        let todo = new database.models.todoModel({
            gorev: req.body.gorev,
            sahip: req.session.user.id
        });
        await todo.save();
        res.json(todo);
    });
    
    router.delete("/:gorev", async (req, res) => {
        if (!req.session.user) return res.redirect("/");

        await database.models.todoModel.deleteOne({
            gorev: decodeURIComponent(req.params.gorev),
            sahip: req.session.user.id
        });
        res.json({
            success: true
        });
    });

    return router;
}