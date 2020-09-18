const express = require('express');
const router = express.Router();
const Post = require("../db/models/postModel");

// Create A Post
router.post("/posts/new", async (req, res) => {
    // retrieve the data from the request
    const { title, createdAt, article, authorname } = req.body;
    console.log(title, createdAt, article, authorname);

    // constructing the post model
    const newPost = new Post({
        title,
        createdAt,
        article,
        authorname
    });

    // saving post model
    try {
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        console.error(err);
    }
});

// GET all Post
router.get("/posts", async (req, res) => {
    const getallposts = await Post.find();
    res.json(getallposts);

});

// GET single Post by id 
router.get("/posts/:id", async (req, res) => {
    const singlePost = await Post.findById(req.params.id);
    res.json(singlePost);
});


//  GET post by id and DELETE a Post
router.delete("/posts/delete/:id", async (req, res) => {
    const deletedPost = await Post.findById(req.params.id);
    res.json(deletedPost);
});

module.exports = router;