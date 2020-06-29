const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
    username: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    id: { 
        type: String, 
        required: true
    }
});

module.exports = Mongoose.model("userModel", userSchema, "USER_COLLECTION");