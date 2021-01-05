const configs = {
    env: {
        tmdbURL: 'https://api.themoviedb.org/3',
        tmdbImageURL: 'https://image.tmdb.org/t/p/w500',
        tmdbBackdropURL: 'https://image.tmdb.org/t/p/w780',
        tmdbProfileURL: 'http://image.tmdb.org/t/p/h632',
        defaultLanguage: 'es-ES',
    },
    images: {
        domains: [
            'image.tmdb.org',
        ],
    },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(configs);