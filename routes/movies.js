var express = require('express')
var router = express.Router()
var Movie = require('../models').Movie

var movies = [
  { id: 1, title: 'Oceans 11'},
  { id: 2, title: 'The Hobbit'},
  { id: 3, title: 'Who'}
]

//Get /movies
router.get('/', function(req, res) {
  res.render('movies', { movies: movies})
})

//Post /movies
router.post('/', function(req, res) {
  var title = req.body.title

})

module.exports = router
