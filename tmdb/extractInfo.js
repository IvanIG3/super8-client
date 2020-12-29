// Parse info from tmdb movies/series/etc.

export const extractInfoMovie = movie => ({
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path ? 
        `${process.env.tmdbImageURL}${movie.poster_path}` : 'no-poster.png',
    overview: `${movie.overview.substring(0, 150)}...`,
    backdrop_path: movie.backdrop_path ? 
        `${process.env.tmdbBackdropURL}${movie.backdrop_path}` : 'no-backdrop.png',
    url: `/movies/${movie.id}`,
    type: 'movie'
});

export const extractInfoTvShow = tvShow => ({
    id: tvShow.id,
    title: tvShow.name,
    vote_average: tvShow.vote_average,
    poster_path: tvShow.poster_path ? 
        `${process.env.tmdbImageURL}${tvShow.poster_path}` : 'no-poster.png',
    overview: `${tvShow.overview.substring(0, 150)}...`,
    backdrop_path: tvShow.backdrop_path ? 
        `${process.env.tmdbBackdropURL}${tvShow.backdrop_path}` : 'no-backdrop.png',
    url: `/tvshows/${tvShow.id}`,
    type: 'tvshow'
});
