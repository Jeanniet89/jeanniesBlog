const router = require('express').Router(),
    mongoose = require('mongoose');
let Post = require('../../db/models/postModel');
let Writer = require('../../db/models/writerModel');

// Create A Post
router.post("/posts/new", async (req, res) => {
    try {
          // retrieve the data from the request
        const { title, createdAt, article, authorname } = req.body;
        // constructing the post model
        const post = new Post({
            title,
            createdAt,
            article,
            authorname,
            owner: req.writer._id,
        });
        // saving post model
        await post.save();

        const writer = await Writer.findById(req.writer._id);

        writer.post.push(post._id);
        
        res.status(201).json(Post);
    } catch (error) {
        res.status(400).json({ error: error.toString() })
    }
});

// GET single Post by id 
router.get("/posts/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).json({ error: 'not a valid post id' });

        const post = await Post.findOne({ _id, owner: req.writer._id });
        if (!post) return res.sendStatus(404);
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.toString() })
    }
});

// GET all Post
router.get("/posts", async (req, res) => {
    const sort = {};
    const match = {};

    if (req.query.posts) {
        match.posts = req.query.posts === "true";
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.writer.populate({
            path: 'posts',
            match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            })
            .execPopulate();
        res.json(req.writer.posts);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Update a post
router.patch('/posts/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        title,
        createdAt,
        article,
        authorname,
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' });
    try {
        const posts = await Post.findOne({
            _id: req.params.id,
            owner: req.writer._id
        });
        if (!posts) return res.status(404).json({ error: 'Post not found' });
        updates.forEach((update) => (posts[update] = req.body[update]));
        await posts.save();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
    try {
        const posts = await Post.findOneAndDelete({
            _id: req.params.id,
            owner: req.writer._id
        });
        if (!posts) return res.status(404).json({ error: 'Post not found' });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;