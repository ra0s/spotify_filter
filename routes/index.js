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

router.get('/categories', function(req, res){
  console.log(req.query.categories)
  spotify.spotifyApi.searchCategory(req.query.categories)
  .then(function(result) {
<<<<<<< HEAD
    console.log(result);
    res.render('results', {tracklist: result} )
=======
    console.log(result); 
    res.render('/results');
>>>>>>> sid
  } )
})

module.exports = router;
