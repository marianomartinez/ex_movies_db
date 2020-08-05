// // const db = require('../models/')
// // const Movies = db.Movies;
// // const Actors = db.Actors;


// module.exports = (sequelize, dataTypes) => {
//     let alias = 'actorMovie';
//     let cols = {
//         id: {
//             type: dataTypes.BIGINT(10).UNSIGNED,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         // created_at: dataTypes.TIMESTAMP,
//         // updated_at: dataTypes.TIMESTAMP,
//         actor_id: {
//             type: dataTypes.INTEGER(10).UNSIGNED,
//             allowNull: false
//         },
//         movie_id: {
//             type: dataTypes.INTEGER(10).UNSIGNED,
//             allowNull: false
//         }
//     };
//     let config = {
//         timestamps: true,
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//         deletedAt: false
//     }
//     const actorMovie = sequelize.define(alias, cols, config);

//     actorMovie.associate = function (models) {
//         actorMovie.belongsToMany(models.Actor, { // models.Actors -> Actors es el valor de alias en actor.js
//             as: "actor",
//             through: 'actor_movie',
//             foreignKey: 'actor_id',
//             otherKey: 'movie_id',
//             timestamps: false
//         })
//         actorMovie.belongsToMany(models.Movie, { // models.Movies -> Movies es el valor de alias en movie.js
//             as: "movie",
//             through: 'actor_movie',
//             foreignKey: 'movie_id',
//             otherKey: 'actor_id',
//             timestamps: false
//         })
//     }

//     return actorMovie
// };