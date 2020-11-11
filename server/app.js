require('../server/db/config');
  express = require('express'),
  passport = require('./middleware/authentication/'),
  cookieParser = require('cookie-parser'),
  cors = require("cors"),
  openRoutes = require('./routes/open'),
  writerRoutes = require('./routes/secure/writers'),
  readersRoutes = require('./routes/readers'),
  postsRoutes = require('./routes/secure/posts'),
  path = require('path'),
  fileUpload = require('express-fileupload');
  
app = express();
app.use(cors());

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Unauthenticated routes
app.use(openRoutes);
app.use(readersRoutes);

app.use(
  passport.authenticate('jwt', {
    session: false
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/images'
  })
);

//  Authenticated  Routes
app.use(writerRoutes);
app.use(postsRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
