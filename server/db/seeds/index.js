if (process.env.NODE_ENV !== 'production') require('dotenv').config();

require('./index');

const Post = require('../models/postModel'),
    Writer = require('../models/writerModel'),
    faker = require('faker'),
    mongoose = require('mongoose');

const dbReset = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }

    await Writer.countDocuments({}, function (err, count) {
        console.log('Number of writers:', count);
    });
    await Post.countDocuments({}, function (err, count) {
        console.log('Number of posts:', count);
    });
    const writerIdArray = [];

    for (let i = 0; i < 1000; i++) {
        const me = new Writer({
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            admin: Boolean(Math.round(Math.random())),
            email: faker.internet.email(),
            password: faker.internet.password()
        });
        await me.generateAuthToken();
        writerIdArray.push(me._id);
    }

    for (let i = 0; i < 1000; i++) {
        const post = new Post({
            description: faker.lorem.paragraph(),
            completed: Boolean(Math.round(Math.random())),
            dueDate: faker.date.future(),
            owner: writerIdArray[Math.floor(Math.random() * writerIdArray.length)]
        });
        await post.save();
    }
    await Writer.countDocuments({}, function (err, count) {
        console.log('Number of writers:', count);
    });
    await Post.countDocuments({}, function (err, count) {
        console.log('Number of posts:', count);
    });
};

dbReset();