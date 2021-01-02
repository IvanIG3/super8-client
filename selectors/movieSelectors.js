import { createSelector } from 'reselect';

export const movieSelector = createSelector(
    state => state.movie.movie,
    movie => movie ? ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path ? 
            `${process.env.tmdbImageURL}${movie.poster_path}` : '/no-poster.png',
        overview: movie.overview,
        score: movie.vote_average && movie.vote_count &&
            `${movie.vote_average * 10} / 100 (${movie.vote_count} )` || "0",
        runtime: movie.runtime ?
            new Date(movie.runtime * 60 * 1000).toISOString().substr(11, 8) : "00:00:00",
        genres: movie.genres ? movie.genres.map(genre => genre.name).join(', ') : "-",
        release_date: movie.release_date,
    }) : {}
);

export const castSelector = createSelector(
    state => state.movie.cast,
    cast => cast && cast.map(actor => ({
        profile_path: actor.profile_path ?
            `${process.env.tmdbProfileURL}${actor.profile_path}` : '/no-poster.png',
        name: actor.name,
        character: actor.character,
    }))
);

export const recommendationsSelector = createSelector(
    state => state.movie.recommendations,
    list => list && list.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path ? 
            `${process.env.tmdbImageURL}${movie.poster_path}` : '/no-poster.png',
        vote_average: movie.vote_average || 0,
        url: `/movies/${movie.id}`,
    }))
);