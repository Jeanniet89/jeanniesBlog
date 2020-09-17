const router = require('express').Router(),
    Writer = require('../../db/models/writerModel');

// Create a new writer
router.post('/new', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newWriter = new Writer({
            name,
            email,
            password
        });

        const token = await Writer.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        });
        res.status(201).json(newWriter);
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
});

// Login a writer
router.post('/login', async (req, res) => {
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
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
});

module.exports = router;