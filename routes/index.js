var express = require('express');
var router = express.Router();
const spotify = require('../public/javascripts/methods');

/* GET home page. */
router.get('/', function(req, res, next) {
  spotify.data.initCredential();
  res.render('index');
});

router.get('/results', function(req, res, next){
  res.render('results');
});
router.get('/categories', function(req, res){
  console.log(req.query.categories)
  // req.query.categories;
  spotify.data.searchCategory(req.query.categories);
  res.redirect('/')
})

module.exports = router;
