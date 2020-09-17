require('../server/db/config');
  express = require('express'),
  passport = require('./middleware/authentication/'),
  cookieParser = require('cookie-parser'),
  cors = require("cors"),
  path = require('path'),
  openRoutes = require('./routes/open');
  writerRoutes = require('./routes/secure/writers'),
    fileUpload = require('express-fileupload');

app = express();

// Unauthenticated routes
app.use(openRoutes);


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

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

// setting routes 
app.use('/posts', require('./routes/posts'));
app.use('/readers', require('./routes/readers'));
app.use('/writers', require('./routes/secure/writers'));


//  Authenticated  Routes
app.use(writerRoutes);


// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
module.exports = app;
