import axios from 'axios';

const tmdb = axios.create({
    baseURL: process.env.tmdbURL
});

export default tmdb;