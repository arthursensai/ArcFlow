import { useState, useEffect } from "react";
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const useHabits = () => {
    const [habits, setHabits] = useState([]);
    const [habitsError, setHabitsError] = useState(null);
    const [habitsLoading, setHabitsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${mainUrl}/habit`);
                setHabits(response.data.habits);
                setHabitsError(null);
            } catch (err) {
                setHabitsError(err);
            } finally {
                setHabitsLoading(false);
            }
        };

        fetchData();
    }, []);
    return { habits, habitsError, habitsLoading };
};

export default useHabits;