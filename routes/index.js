var express = require('express');
var router = express.Router();
const spotify = require('../public/javascripts/methods');

/* GET home page. */
router.get('/', function(req, res, next) {
  spotify.spotifyApi.initCredential();
  res.render('index');
});

router.get('/categories', function(req, res){
  console.log(req.query.categories)
  spotify.spotifyApi.searchCategory(req.query.categories);
  res.redirect('/')
})

module.exports = router;
