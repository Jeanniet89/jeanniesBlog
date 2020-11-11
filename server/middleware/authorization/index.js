const router = require('express').Router();

const isAdmin = () => {
    return (req, res, next) => {
        if (!req.writer.admin)
            return res.status(401).json({ error: 'access denied' });
        next();
    };
};

module.exports = isAdmin;