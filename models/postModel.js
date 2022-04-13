const mongoose = require("mongoose");
const postShema = new mongoose.Schema({
  title: { type: String, required: [true, "Post must have a title"] },
  body: { type: String, required: [true, "Post must have a body"] },
});

const Post = mongoose.model("Post", postShema);
module.exports = Post;
