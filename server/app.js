require('../server/db/config');
  express = require('express'),
  passport = require('./middleware/authentication/'),
  cookieParser = require('cookie-parser'),
  cors = require("cors"),
  openRoutes = require('./routes/open'),
  writerRoutes = require('./routes/secure/writers'),
  ReadersRoutes = require('./routes/readers'),
  path = require('path'),
    fileUpload = require('express-fileupload');
  
app = express();
app.use(cors());

//Middleware
app.use(express.json());

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

// Unauthenticated routes
app.use(openRoutes);
app.use(ReadersRoutes);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


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

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
module.exports = app;
