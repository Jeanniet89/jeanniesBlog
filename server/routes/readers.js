const express = require('express');
const router = express.Router();
const Reader = require("../db/models/readerModel");

// Create A comment
router.post("/readers/comments", async (req, res) => {
    // retrieve the data from the request
    const { title, createdAt, text, authorname } = req.body;
    console.log(title, createdAt, text, authorname);

    // constructing the post model
    const newComment = new Reader({
        title,
        createdAt,
        text,
        authorname
    });

    // saving post model
    try {
        const comment = await newComment.save();
        res.json(comment);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
