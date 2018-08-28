var express = require('express')
var router = express.Router()
var Movie = require('../models').Movie

// GET /movies
router.get('/', function(req, res) {
  //SELECT * FROM movies
  Movie.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then( function(movies) {
      return res.render('movies', { movies: movies })
    })
})

// PUT /movies/:id
router.put('/:id', function(req, res) {
  Movie.update(
    { title: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/movies')
  })
})

// GET /movies/:id/edit
router.get('/:id/edit', function(req, res) {
  Movie.findById(req.params.id)
    .then( function(movie) {
      return res.render('edit', { movie: movie })
    })
})

// DELETE /movies/:id
router.delete('/:id', function(req, res) {
  // SELECT * FROM movies WHERE id = 1 LIMIT 1
  Movie.findById(req.params.id)
    .then( function(movie) {
      // DELETE FROM movies WHERE id = 1
      movie.destroy()
    })
    .then( function() {
      return res.redirect('/movies')
    })
})

// POST /movies
router.post('/', function(req, res) {
  //<input name="title" />
  var title = req.body.title
  //INSERT INTO movies (title,description)
  //VALUES("Some Movie", "Some Description")
  Movie.create({ title: title})
    .then( function() {
      res.redirect('/movies')
    })
  

})

module.exports = router
