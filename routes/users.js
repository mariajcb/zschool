var express = require('express');
var router = express.Router();
var db = require('../db/local_API')

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getAllUsers().then(users => {
    res.render('users/all', {title: 'Zschool Bloggers', users: users})
  })
})

module.exports = router;
