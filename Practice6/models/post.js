const mongoose = require("mongoose");

// don't need to connect again

const postSchema = mongoose.Schema({
    //object of user _id 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,

  //array of objects of type user _id 's
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

module.exports = mongoose.model("post" , postSchema);
