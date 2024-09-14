const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/Practice3`);

const userScheme = mongoose.Schema({
    name: String,
    userName: String,
    email: String
})

module.exports =  mongoose.model("user", userScheme);