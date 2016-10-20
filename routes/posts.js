
'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/local_API')

router.get('/', function(req, res) {
  db.getAllPosts().then(posts => {
    res.render('posts/all', {title: 'Zschool: All the Cries for Help', posts: posts})
  })
})

router.get('/:id', function(req, res) {
  db.getPost(req.params.id).then(post => {
    db.getAllUsers().then(users => {
      res.render('posts/one', {title: 'Zschool: ' + post.title, post: post, users: users})
    })
  })
})

module.exports = router;
