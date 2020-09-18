const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    authorname: {
        type: String,
        reqired: true
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
