const router = require('express').Router(),
    isAdmin = require('../../middleware/authorization/index'),
    passport = require('../../middleware/authentication/index'),
    jwt = require('jsonwebtoken');

router.post(
    '/writers/new',
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => res.json(req.user)
);

router.get('/admin', isAdmin(),
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => {
        try {
            res.json({ message: 'admin user' });
        } catch (error) {
            res.status(401).json({ error: error.toString() });
        }
    }
);

router.patch(
    '/me',
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            'name',
            'email',
            'password'
        ];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );
        if (!isValidOperation)
            return res.status(400).send({ error: 'invalid update!' });
        if (updates.includes('phoneNumber')) welcomeText(req.body.phoneNumber);
        try {
            updates.forEach((update) => (req.user[update] = req.body[update]));
            await req.user.save();
            res.json(req.user);
        } catch (error) {
            res.status(400).json({ error: error.toString() });
        }
    }
);

router.post(
    '/logout',
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => {
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
    }
);

router.post(
    '/logoutAll',
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.clearCookie('jwt');
            res.json({ message: 'all devices logged out' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
);

router.put(
    '/password',
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => {
        try {
            req.user.password = req.body.password;
            await req.user.save();
            res.clearCookie('jwt');
            res.json({ message: 'password updated successfully' });
        } catch (error) {
            res.json({ error: error.toString() });
        }
    }
);

router.delete(
    '/:id',
    router.use(
        passport.authenticate('jwt', {
            session: false
        })
    ),
    async (req, res) => {
        try {
            await req.user.remove();
            res.clearCookie('jwt');
            res.json({ message: 'user deleted' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
);

module.exports = router;
