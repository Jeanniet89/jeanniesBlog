require('dotenv').config();
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./server/app'),
 PORT = process.env.PORT || 8080;

// Setting Routes
const postRoutes = require("./server/routes/posts");
app.use('/posts', postRoutes);
const readerRoutes = require("./server/routes/readers");
app.use('/readers', readerRoutes);
const writerRoutes = require("./server/routes/secure/writers");
app.use('/writers', writerRoutes);

app.listen(PORT, () => {
  console.log(`Express server is up on port ${PORT}`);
});

