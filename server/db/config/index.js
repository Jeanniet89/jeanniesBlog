const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log('Connected to MongoDB');
} catch (err) {
  console.log(err.toString());
}
