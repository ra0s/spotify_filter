var express = require('express');
var router = express.Router();
const spotify = require('../public/js/methods');

/* GET home page. */
router.get('/', function(req, res, next) {
  spotify.spotifyApi.initCredential();
  res.render('index');
});

router.get('/results', function(req, res, next){
  res.render('results');
});

router.get('/genre', function(req, res){
  console.log('Genre: ' + req.query.genre)
  console.log('Popularity: ' + req.query.pop);
  spotify.spotifyApi.findTracks(req.query.genre, req.query.pop)
  .then(function(result) {
    res.render('results', {tracklist: result} )
  } )
})

module.exports = router;
