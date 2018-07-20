var express = require('express');
var router = express.Router();
const spotify = require('../public/javascripts/methods');

/* GET home page. */
router.get('/', function(req, res, next) {
  spotify.spotifyApi.initCredential();
  res.render('index');
});

router.get('/results', function(req, res, next){
  res.render('results');
});

router.get('/genre', function(req, res){
  console.log(req.query.genre)
  console.log(req.query.pop)
  spotify.spotifyApi.findTracks(req.query.genre)
  .then(function(result) {
    console.log("THIS IS THE TRACKLIST\n" + result[0].album_name);
    res.render('results', {tracklist: result} )
  } )
})

module.exports = router;
