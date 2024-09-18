const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/Practice3`);

const userScheme = mongoose.Schema({
    userName: String,
    email: String,
    url:String,
    gender:String
})

module.exports =  mongoose.model("user", userScheme);