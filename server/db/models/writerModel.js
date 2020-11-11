const mongoose = require('mongoose'),
    validator = require('validator'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    Post = require('./postModel');

const Schema = mongoose.Schema;

const writerSchema = new Schema({
        name: {
            type: 'String',
            required: true,
            trim: true
        },
        email: {
            type: 'String',
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid.');
                }
            }
        },
        password: {
            type: 'String',
            required: true,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error("Can't be password.");
                }
                if (value.length < 6) {
                    throw new Error('Password must be at least 6 characters long.');
                }
            }
        },
        post: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        admin: {
            type: 'Boolean',
            required: true,
            default: true
        },
        tokens: [
            {
                token: {
                    type: 'String',
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);
// creates the relation between post & writer
writerSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'owner'
});

// hide password & tokens for security
writerSchema.methods.toJSON = function () {
    const writer = this;
    const writerObject = writer.toObject();
    delete writerObject.password;
    delete writerObject.tokens;
    return writerObject;
};
// generate jwt token
writerSchema.methods.generateAuthToken = async function () {
    const writer = this;
    const token = jwt.sign(
        { _id: writer._id.toString(), name: writer.name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    writer.tokens = writer.tokens.concat({ token });
    await writer.save();
    return token;
};

// to find a writer by email and password
writerSchema.statics.findByCredentials = async (email, password) => {
    const writer = await Writer.findOne({ email });
    if (!writer) throw new Error('Not a user.');
    const isMatch = await bcrypt.compare(password, writer.password);
    if (!isMatch) throw new Error('Invalid credentials');
    return writer;
};

// to hash passwords whenever a writer is created or a writer password is updated.
writerSchema.pre('save', async function (next) {
    const writer = this;
    if (writer.isModified('password')) {
        writer.password = await bcrypt.hash(writer.password, 8);
    }
    next();
});

// Delete posts when user is removed.
writerSchema.pre('remove', async function (next) {
    const writer = this;
    await Post.deleteMany({
        owner: writer._id
    });
    next();
});

const Writer = mongoose.model("Writer", writerSchema);

module.exports = Writer;