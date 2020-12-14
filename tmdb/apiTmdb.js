import axios from 'axios';

const apiTmdb = async (endpoint, params) => {
    const response = await axios.post('/api/tmdb', { endpoint, params });
    return response.data;
};

export default apiTmdb;