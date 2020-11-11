const mongoose = require('mongoose'),
    moment = require('moment'),
    Writer = require('./writerModel');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    article: {
        type: 'String',
        required: true
    },
    createdAt: {
        type: 'Date',
        default: Date.now
    },
    authorname: {
        type: 'String',
        reqired: true
    },
    owner: {
        type: mongoose.Schema.Types.String,
        ref: "Writer"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reader"
    }],
},
    {
        timestamps: true,
    }
);
postSchema.virtual('writers', {
    ref: Writer,
    localField: '_id',
    foreignField: 'posts'
});

postSchema.methods.toJSON = function () {
    const post = this;
    const postObject = post.toObject();
    if (postObject.createdAt) {
        postObject.createdAt = moment(postObject.createdAt).format('YYYY-MM-DD')
    }
    return postObject;
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
