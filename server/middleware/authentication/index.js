const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    Writer = require('../../db/models/writerModel'),
    ExtractJwt = require('passport-jwt').ExtractJwt;

// JWT Strategy
let jwtOptions = {
    jwtFromRequest: (req) => {
        return req?.cookies?.jwt || ExtractJwt.fromAuthHeaderWithScheme('jwt')(req);
    },
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
            return done(null, false, { message: 'jwt expired' });
        }
        let { iat, exp, ...userData } = jwtPayload;
        userData = await Writer.findById(userData._id);
        return done(null, userData);
    })
);

module.exports = passport;