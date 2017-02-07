const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Home'})
})

router.get('/test', (req, res, next) => {
  res.render('test')
})

module.exports = router
