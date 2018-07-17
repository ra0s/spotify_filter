const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const SpotifyWebApi = require('spotify-web-api-node');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const spotify = require('./public/javascripts/methods');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//test

// var spotifyApi = new SpotifyWebApi({
//   clientId: 'cfce71627486462793a9998a7c46c03a',
//   clientSecret: 'b6e52ba4947b4e8ea700db9423cdba9c',
//   // accessToken: '',
// });

// spotifyApi.clientCredentialsGrant().then(
//   function (data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//     // this.accessToken = data.body['access_token'];
//   },
//   function (err) {
//     console.log(
//       'Something went wrong when retrieving an access token',
//       err.message
//     );
//   }
// ).then(function () {
//   spotifyApi.getArtistAlbums(
//     '43ZHCT0cAZBISjO8DG9PnE',
//     { limit: 10, offset: 20 },
//     function (err, data) {
//       if (err) {
//         console.error('Something went wrong!');
//       } else {
//         console.log(data.body);
//       }
//     }
//   );
// })

// spotifyApi.getArtistAlbums(
//   '43ZHCT0cAZBISjO8DG9PnE',
//   { limit: 10, offset: 20 },
//   function (err, data) {
//     if (err) {
//       console.error('Something went wrong!');
//     } else {
//       console.log(data.body);
//     }
//   }
// );

// spotify.data.initCredential();


module.exports = app;
