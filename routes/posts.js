
'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/local_API')

//authentication middleware
var ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render(`error`, { message: `You must be logged in.` });
};

router.get('/', (req, res) => {
  db.getAllPosts().then(posts => {
    res.render('posts/all', {title: 'Zschool: All the Cries for Help', posts: posts})
  })
})

// router.get('/:id', (req, res) => {
//   db.getPost(req.params.id).then(post => {
//     db.getAllUsers().then(users => {
//       db.getCommentsByPostId(postId).then((comments) => {
//       res.render('posts/one', {title: 'Zschool: ' + post.title, post: post, users: users})
//       })
//     })
//   })
// })

router.get('/:id', (req, res) => {
  db.getPost(req.params.id).then(post => {
    db.getAllUsers().then(users => {
      res.render('posts/one', {title: 'Zschool: ' + post.title, post: post, users: users})
    })
  })
})
router.get('/new', ensureAuthenticated, (req, res) => {
  db.getAllUsers().then(users => {
    res.render('posts/new', {title: 'Zschool: Write a Post', users: users})
  })
})


router.post('/', ensureAuthenticated, (req, res) => {
  db.createOnePost().then(post => {
    res.redirect('/')
  })
})

router.get('/:id/edit', ensureAuthenticated, (req, res) => {
  db.getPost(req.params.id).then(post => {
    res.render('posts/edit', {title: 'Zschool: ' + post.title, post: post})
  })
})

router.put('/:id', ensureAuthenticated, (req, res) => {
  db.updatePost(req.params.id).then(() => {
    res.redirect('/')
  })
})

router.delete('/:id', ensureAuthenticated, (req, res) => {
  db.deletePost(req.params.id).then(() => {
    res.redirect('/')
  })
})

module.exports = router;
