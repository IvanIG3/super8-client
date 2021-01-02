import { createSelector } from 'reselect';

export const tvShowSelector = createSelector(
    state => state.tvShow.tvShow,
    tvShow => tvShow ? ({
        id: tvShow.id,
        title: tvShow.name,
        poster_path: tvShow.poster_path ? 
            `${process.env.tmdbImageURL}${tvShow.poster_path}` : '/no-poster.png',
        overview: tvShow.overview,
        score: tvShow.vote_average && tvShow.vote_count &&
            `${tvShow.vote_average * 10} / 100 (${tvShow.vote_count})` || "0",
        first_air_date: tvShow.first_air_date,
        genres: tvShow.genres ? tvShow.genres.map(genre => genre.name).join(', ') : "-",
        seasons: tvShow.seasons ? tvShow.seasons.length : 1,
    }) : {}
);

export const castSelector = createSelector(
    state => state.tvShow.cast,
    cast => cast && cast.map(actor => ({
        profile_path: actor.profile_path ?
            `${process.env.tmdbProfileURL}${actor.profile_path}` : '/no-poster.png',
        name: actor.name,
        character: actor.roles && actor.roles.length > 0 && actor.roles[0].character,
    }))
);

export const recommendationsSelector = createSelector(
    state => state.tvShow.recommendations,
    list => list && list.map(tvShow => ({
        id: tvShow.id,
        title: tvShow.name,
        poster_path: tvShow.poster_path ? 
            `${process.env.tmdbImageURL}${tvShow.poster_path}` : '/no-poster.png',
        vote_average: tvShow.vote_average || 0,
        url: `/tvshows/${tvShow.id}`,
    }))
);