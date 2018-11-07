var express = require('express')
var router = express.Router()
var Movie = require('../models').Movie

//Get /movies
router.get('/', function(req, res) {
  Movie.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then(function(movies) {
    return res.render('movies', { movies: movies})
    })
})

//PUT /movies/:id
router.put('/:id', function(req, res) {
  Movie.update(
    { title: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/movies')
  })
})

//Get /movies/:id/edit
router.get('/:id/edit', function(req, res) {
  Movie.findById(req.params.id)
    .then( function(movie) {
      return res.render('edit', { movie: movie})
    })
})

//Delete /movies/:id
router.delete('/:id', function(req, res) {
  Movie.findById(req.params.id)
    .then( function(movie) {
      movie.destroy()
    })
    .then( function() {
      return res.redirect('/movies')
    })
})

//Post /movies
router.post('/', function(req, res) {
  var title = req.body.title
  Movie.create({title: title})
    .then( function() {
      res.redirect('/movies')
    })
})

module.exports = router
