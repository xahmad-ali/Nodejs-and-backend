const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/Paractice5`)

const userScheme = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password: String
})

module.exports = mongoose.model("user", userScheme);