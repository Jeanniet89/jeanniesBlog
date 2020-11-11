const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const readerSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    comment: {
        type: 'String',
        required: true
    },
    createdAt: {
        type: 'Date',
        default: Date.now
    },
});

// creates the relation between post & reader
readerSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'comments'
});

const Reader = mongoose.model("Reader", readerSchema);

module.exports = Reader;