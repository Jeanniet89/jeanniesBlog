const express = require('express');
const router = express.Router();

isAdmin = require('../../middleware/authorization/index');

router.get('/admin', async (req, res) => {
    try {
        res.json({ message: "admin user" });
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
})

module.exports = isAdmin;