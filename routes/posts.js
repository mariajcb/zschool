'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/local_API')

//authentication middleware
var ensureAuthenticated = (req, res, next) => {
  console.log('THIS IS AUTHENTICATED ', req.isAuthenticated());
  console.log('THIS IS REQ.USER', req.user());
    if (req.isAuthenticated()) {
        return next();
    }
    res.render(`error`, {
        message: `Please log in.`
    });
};

router.get('/', (req, res) => {
    db.getAllPosts().then(posts => {
        res.render('posts/all', {
            title: 'Zschool: All the Cries for Help',
            posts: posts
        })
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
            res.render('posts/one', {
                title: 'Zschool: ' + post.title,
                post: post,
                users: users
            })
        })
    })
})

router.get('/new', ensureAuthenticated, (req, res, next) => {
  if (req.user) {
    db.createPost().then(users => {
        res.render('posts/new', {
            title: 'Zschool: Write a Post',
            users: users
        })
    })
  } else {
    res.render(`error`, {
        message: `Please log in.`
    })
  }
})

router.post('/', ensureAuthenticated, (req, res, next) => {
  if (req.user) {
    db.createPost().then(post => {
        res.redirect('/')
    })
  } else {
    res.render(`error`, {
        message: `Please log in.`
    })
  }
})

router.get('/:id/edit', ensureAuthenticated, (req, res, next) => {
  if (req.user) {
    db.getPost(req.params.id).then(post => {
        res.render('posts/edit', {
            title: 'Zschool: ' + post.title,
            post: post
        })
    })
  } else {
    res.render(`error`, {
        message: `Please log in.`
    })
  }
})

router.put('/:id', ensureAuthenticated, (req, res, next) => {
  if (req.user) {
    db.updatePost(req.params.id).then(() => {
        res.redirect('/')
    })
  } else {
    res.render(`error`, {
        message: `Please log in.`
    })
  }
})

router.delete('/:id', ensureAuthenticated, (req, res, next) => {
    if (req.user) {
        db.deletePost(req.params.id).then(() => {
            res.redirect('/')
        })
    } else {
        res.render(`error`, {
            message: `Please log in.`
        });
    }
})

module.exports = router;
