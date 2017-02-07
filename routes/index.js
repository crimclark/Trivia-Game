const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars');

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Login Page'});
})

router.get('/new', (req, res, next) => {
  res.render('new', {title: 'New Game'});
})

router.get('/user', (req, res, next) => {
  res.render('profile', {title: 'Player Profile'});
})

router.get('/test', (req, res, next) => {
  res.render('test')
})

module.exports = router
