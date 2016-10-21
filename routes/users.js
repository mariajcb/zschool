var express = require('express');
var router = express.Router();
var db = require('../db/local_API')

/* GET users listing. */
router.get('/', (req, res, next) => {
    db.getAllUsers().then(users => {
        res.render('users/all', {
            title: 'Zschool Bloggers',
            users: users
        })
    })
})

router.get('/new', (req, res) => {
    res.render('users/new', {
        title: 'Add a User'
    })
})

router.post('/', (req, res) => {
    db.createUser(req.body).then(() => {
        res.redirect('/users')
    })
})

router.get('/:id/edit', (req, res) => {
    res.render('users/edit')
})

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    db.updateUser('users', userId).then(() => {
        res.render('users/all')
    })
})

router.get('/:id/delete', (req, res) => {
    const userId = req.params.id;
    db.deleteUser(userId).then(() => {
        res.redirect('/')
    })
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.getUser(req.params.id).then(user => {
        res.render('users/one', {
            title: 'Zschool: ' + user.first_name + ' ' + user.last_name,
            user: user
        })
    })
})

module.exports = router;
