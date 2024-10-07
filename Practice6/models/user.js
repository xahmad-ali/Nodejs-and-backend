const mongose = require('mongoose');

mongose.connect(`mongodb://localhost:27017/Paractice6`);

const userScheme = mongose.Schema({
    name: String,
    userName: String,
    email: String,
    age: Number,
    password: String,
    // attribute that have reffernces of posts, it's an array
    // post=> an array of objects, conatains refferences of objectId of post model
    posts: [
        {
            type: mongose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]

});

module.exports = mongose.model("user", userScheme);