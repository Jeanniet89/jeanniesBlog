const express = require('express');
const router = express.Router();
cloudinary = require('cloudinary').v2;
isAdmin = require('../../middleware/authorization/index');
const Writer = require("../../db/models/writerModel");


// Get current Writer
router.get('/me', async (req, res) => res.json(req.writer));

// Update writer
router.patch('/me', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send({ error: 'invalid updates!' });
    try {
        updates.forEach((update) => (req.writer[update] = req.body[update]));
        await req.writer.save();
        res.json(req.writer);
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
});

module.exports = router;