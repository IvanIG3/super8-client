import tmdb from '../../tmdb/axiosTmdb';

export default async function handler(req, res) {
    // Get data from request
    const data = req.body;
    const endpoint = data.endpoint;
    const params = data.params || {};
    params['api_key'] = process.env.TMDB_API_KEY;
    // Create api url call
    const urlparams = new URLSearchParams(params).toString();
    const call = `${endpoint}?${urlparams}`;
    // Do api call and return the result data
    try {
        const movies = await tmdb.get(call);
        res.status(200).json(movies.data);
    } catch (error) {
        res.status(500).json({ 
            msg: "Error", 
            error 
        });
    }
};