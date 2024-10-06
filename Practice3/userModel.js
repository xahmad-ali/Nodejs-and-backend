const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/Practice3`);

const userScheme = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    city: String,
    gender: String,
    description: String,
    subjects: String,
})

module.exports =  mongoose.model("user", userScheme);