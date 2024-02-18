
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    uid: String,
    title: String,
    shortDescription: String,
    long: String,
    summary: String,
    image: String, // Assuming you store the image path
});
// const BlogPost = mongoose.model("Post", postSchema);

module.exports = mongoose.model("post", postSchema);