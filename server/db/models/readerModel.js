const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const readerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Reader = mongoose.model("Reader", readerSchema);

module.export = Reader;