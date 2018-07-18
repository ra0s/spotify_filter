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
});

// CountTo100(){
//   let numbers[100];
//   for (let i = 0; i < 100; i++) {
//     let n = 1;
//     numbers[i] = n;
//     n++;
//   }
// }

module.exports = router;
