import { useState, useEffect } from 'react';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const useQuote = () => {
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState(null);
    const [quoteError, setQuoteError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${mainUrl}/api/quote`);
                setQuote(response.data.quote);
                setAuthor(response.data.author);
                setQuoteError(null);
            } catch (err) {
                setQuoteError(err);
            }
        };

        fetchData();
    }, [1]);

    return { quote, author ,quoteError };
};

export default useQuote;