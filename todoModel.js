const Mongoose = require("mongoose");

const todoSchema = new Mongoose.Schema({
    gorev: {
        type: String, 
        required: true
    }
});

module.exports = Mongoose.model("todoModel", todoSchema, "TODO_COLLECTION");