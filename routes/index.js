var express = require('express');
var router = express.Router();
var users = require('./users')
var posts = require('./posts')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zschool: Survival Blog' });
});

router.use('/users', users)
router.use('/posts', posts)

module.exports = router;
