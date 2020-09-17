require('dotenv').config();
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./server/app');
const PORT = process.env.PORT || 8080;

// Setting Routes
const postRouter = require("./server/routes/posts");
app.use('/posts', postRouter);
const readerRouter = require("./server/routes/readers");
app.use('/readers', readerRouter);
const writerRouter = require("./server/routes/secure/writers");
app.use('/writers', writerRouter);


app.listen(PORT, () => {
  console.log(`Express server is up on port ${PORT}`);
});

