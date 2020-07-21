// Path, to avoid / and \ conflicts
const path = require('path');

const db = require('../database/models/') // Requiero la base de datos

const { Op } = require("sequelize");
const genre = require('../database/models/genre');

const Movies = db.Movies;
const Genres = db.Genres;

// This syntax exports this module while defining this controller's methods
module.exports = {
    index: function (req, res) {
        let promMovies = Movies.findAll();
        let promGenres = Genres.findAll();
        Promise
        .all([promMovies, promGenres])
        .then(function([allMovies, allGenres]) {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesIndex'),{allMovies, allGenres})})
        .catch(error => res.send(error)) // !!! No se puede usar .catch sin .then + return !!!
        // !!! BUSCAR sobre "async await" !!!
        // !!! BUSCAR sobre "try catch" !!!
    },
    detail: function (req,res) {
        let movieId = req.params.id;
        Movies
        .findByPk(movieId)
        .then(thisMovie => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesDetail'),{thisMovie})})
        .catch(error => res.send(error))
    },
    add: function (req, res) {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesAdd'))
        // .catch(error => res.send(error))
    },
    create: function (req, res) {
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
            return res.redirect('/movies')
        .catch(error => res.send(error))
    },
    edit: function (req, res) {
        let movieId = req.params.id;
        Movies
        .findByPk(movieId)
        .then(thisMovie => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesEdit'), {thisMovie})})
        .catch(error => res.send(error))
    },
    update: function (req, res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
            return res.redirect('/movies')
        .catch(error => res.send(error))
    },
    delete: function (req, res) {
        let movieId = req.params.id;
        Movies
        .findByPk(movieId)
        .then(thisMovie => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesDelete'), {thisMovie})})
        .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/movies')})
        .catch(error => res.send(error)) 
    },
    latest: function (req,res) {
        Movies
        .findAll({order: [['release_date','DESC']], limit: 5})
        .then(latestMovies => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesLatest'), {latestMovies})})
        .catch(error => res.send(error))
    },
    recommended: function (req,res) {
        Movies
        .findAll({where: {rating: {[Op.gte]: 8}}})
        .then(recommendedMovies => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesRecommended'), {recommendedMovies})})
        .catch(error => res.send(error))
    },
    genreFilter: function (req,res) {
        let genreId = req.body.genreFilter;
        let promGenre = Genres.findByPk(genreId);
        let promMovies = Movies.findAll({where: {genre_id: genreId}});
        Promise
        .all([promGenre, promMovies])
        .then(function ([sendGenre, filteredMovies]) {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesGenreFiltered'), {filteredMovies,sendGenre})})
        .catch(error => res.send(error))
    },
    // Search via GET method
    searchGet: function (req,res) {
        let searchInput = req.query.searchInput;
        Movies.findAll({where: {title: {[Op.like]: `%${searchInput}%`}}})
        .then(results => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesResults'), {results})
        .catch(error => res.send(error))})
    },
    // Search via POST method
    searchPost: function (req,res) {
        let searchInput = req.body.searchInput;
        let order = req.body.order;
        if (typeof (order) != 'undefined') {
            Movies
            .findAll({where: {title: {[Op.like]: `%${searchInput}%`}},order: [['title','ASC']]})
            .then(results => {
                return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesResults'), {results})})
        } else {
        Movies
        .findAll({where: {title: {[Op.like]: `%${searchInput}%`}}})
        .then(results => {
            return res.render(path.resolve(__dirname, '..', 'views', 'movies', 'moviesResults'), {results})})
        .catch(error => res.send(error))
        }
    }
};