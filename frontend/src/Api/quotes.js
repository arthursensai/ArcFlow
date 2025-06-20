import axios from '../Lib/axios';

export const getQuote = async () => {
    try {
        const serverResponse = await axios.get('/quote');
        return serverResponse;
    } catch(err) {
        throw new Error(err.data || 'Failed getting the quote');
    }
};