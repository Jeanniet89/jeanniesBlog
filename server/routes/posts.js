const express = require('express');
const router = express.Router();
const Post = require("../db/models/postModel");

// Create A Post
router.post("/new", async (req, res) => {
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
router.get("/", async (req, res) => {
    const getallposts = await Post.find();
    res.json(getallposts);

});

// GET single Post by id 
router.get("/:id", async (req, res) => {
    const singlePost = await Post.findById(req.params.id);
    res.json(singlePost);
});


// GET Post by id & update
router.put("/update/:id", async (req, res) => {
    const { title, createdAt, article, authorname } = req.body.id;
    console.log(title, createdAt, article, authorname);

    // constructing the post model
    const updatePost = new Post({
        title,
        createdAt,
        article,
        authorname
    });

    // saving post model
    try {
        const updatePost = await updatePost.save(req.body.id);
        res.json(updatePost);
    } catch (err) {
        console.error(err);
    }
});

//  GET post by id and DELETE a Post
router.delete("/delete/:id", async (req, res) => {
    const deletedPost = await Post.findById(req.params.id);
    res.json(deletedPost);
});

module.exports = router;