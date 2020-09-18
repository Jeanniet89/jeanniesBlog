const router = require('express').Router(),
    Writer = require('../../db/models/writerModel');

// Create a new writer
router.post('/writers/new', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const writer = new Writer({
            name,
            email,
            password
        });
        const token = await writer.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        });
        res.status(201).json(writer);
    } catch (error) {
        res.status(401).json({ error: error.toString() });
    }
});

// Login a writer
router.post('/writers/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const writer = await Writer.findByCredentials(email, password);
        const token = await writer.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        });
        res.json(writer);
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
});

module.exports = router;