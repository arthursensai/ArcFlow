import { useState, useEffect } from "react";
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const useHabit = () => {
    const [habitData, setHabitData] = useState({});
    const [habitDataLoading, setHabitDataLoading] = useState(false);
    const [habitDataError, setHabitDataError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setHabitDataLoading(true);
            try {
                const response = await axios.get(mainUrl + '/profile/habit');
                setHabitData(response.data.habit);
                setHabitDataError(null);
            } catch (err){
                setHabitDataError(err);
            } finally {
                setHabitDataLoading(false);
            }
        };
        fetchData();
    }, [])
    return { habitData, habitDataLoading, habitDataError };
};

export default useHabit;