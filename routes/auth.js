const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const passport = require('passport')

// router.get(`/google`, passport.authenticate(`google`),
//   (req, res) => {
//   });
//
// router.get(`/google/callback`, passport.authenticate(`google`, {
//   successRedirect: `/`,
//   failureRedirect: `/error`
// }));

router.post('/logout', function (req, res) {
  req.logout()
  res.end('logged out')
})

module.exports = router
