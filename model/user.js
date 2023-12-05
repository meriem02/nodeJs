const mongo = require("mongoose");
const Schema = mongo.Schema;
const User = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user', // You can set a default role if needed
    },

});
module.exports = mongo.model("user", User);
