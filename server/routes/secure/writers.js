const router = require('express').Router(),
    isAdmin = require('../../middleware/authorization/index');


router.get('/writers', isAdmin(), async (res) => {
    try {
        res.json({ message: "admin user" });
    } catch (error) {
        res.status(404).json({ error: error.toString() });
    }
});

// Get current writer
router.get('/writers', async (req, res) => {
    try {
        res.json(req.writer);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Updating a writer
router.patch('/writers/me', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => 
        allowedUpdates.includes(update),  
    );
    if (!isValidOperation) 
        return res.status(400).send({ error: 'invalid update!' });
    try {
        updates.forEach((update) => (req.writer[update] = req.body[update]));
        await req.writer.save();
        res.json(req.writer);
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
});

// Logging out a writer
router.post('/writers/logout', async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            await req.user.save();
            res.clearCookie('jwt');
            res.json({ message: 'logged out!' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
});
    
// Loggin out all devices
router.post('/writers/logoutAll',async (req, res) => {
        try {
            req.writer.tokens = [];
            await req.writer.save();
            res.clearCookie('jwt');
            res.json({ message: 'All devices logged out' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });

// Deleting a writer
router.delete('/writers/delete/:id', async (req, res) => {
        try {
            await req.writer.remove();
            res.clearCookie('jwt');
            res.json({ message: 'Account deleted' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
);

module.exports = router;
