const Mongoose = require("mongoose");

const todoSchema = new Mongoose.Schema({
    sahip: {
        type: String, 
        required: true
    },
    gorev: String
});

module.exports = Mongoose.model("todoModel", todoSchema, "TODO_COLLECTION");