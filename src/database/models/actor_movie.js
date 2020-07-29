// const db = require('../models/')
// const Movies = db.Movies;
// const Actors = db.Actors;


module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        actor_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        movie_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ActorMovie = sequelize.define(alias, cols, config);

    ActorMovie.associate = function (models) {
        ActorMovie.belongsToMany(models.Actor, { // models.Actors -> Actors es el valor de alias en actor.js
            as: "actor",
            through: 'ActorMovie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        })
        ActorMovie.belongsToMany(models.Movie, { // models.Movies -> Movies es el valor de alias en movie.js
            as: "movie",
            through: 'ActorMovie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }

    return ActorMovie
};