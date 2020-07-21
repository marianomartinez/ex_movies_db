const express = require('express');

// Express routing
const router = express.Router();

// Path, to avoid / and \ conflicts
const path = require('path');



// Require the controller for these routes
const moviesController = require(path.resolve(__dirname, '..', 'controllers', 'moviesController.js'));

// Web routes and their methods below
router.get('/movies/index', moviesController.index);
router.get('/movies/detail/:id', moviesController.detail);
router.get('/movies/add', moviesController.add);
router.post('/movies/create', moviesController.create);
router.get('/movies/edit/:id', moviesController.edit);
router.post('/movies/update/:id', moviesController.update);
router.get('/movies/delete/:id', moviesController.delete);
router.post('/movies/delete/:id', moviesController.destroy);
router.get('/movies/latest', moviesController.latest);
router.get('/movies/recommended',moviesController.recommended);
router.post('/movies/genreFilter', moviesController.genreFilter);
router.get('/movies/search', moviesController.searchGet);
router.post('/movies/search', moviesController.searchPost);

// Exports this module
module.exports = router;
