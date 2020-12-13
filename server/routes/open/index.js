const router = require('express').Router(),
    passport = require('../../middleware/authentication/index'),
    jwt = require('jsonwebtoken');
let Writer = require('../../db/models/writerModel');

// Create a new writer
router.post('/writers/register', async (req, res) => {
    const { name, email, password } = req.body;
    let writer = await Writer.findOne({ email });
    if (writer) res.status(409).send("that email has already been used");
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
        const writer = await Writer.findByCredentials(
            email,
            password
        );
        console.log(1);
        const token = await writer.generateAuthToken();
        console.log(2);
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        });
        res.json(writer);
        console.log(3);
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
});

module.exports = router;