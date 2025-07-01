import Cookies from 'js-cookie';

const HABIT_COOKIE_KEY = "habitID";

export const setCurrentHabit = (habit) => {
    Cookies.set(HABIT_COOKIE_KEY, habit, {expires: 1});
};

export const getCurrentHabit = () => {
    return Cookies.get(HABIT_COOKIE_KEY) || null;
};

export const clearCurrentHabit = () => {
    Cookies.remove(HABIT_COOKIE_KEY);
}