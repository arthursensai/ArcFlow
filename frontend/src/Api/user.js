import axios from '../Lib/axios';

export const signup = async (username, email, password) => {
    if(!username) throw new Error('no valid username');
    if(!email) throw new Error('no valid email');
    if(!password) throw new Error('no valid password');
    try {
        const serverResponse = await axios.post('/auth/signup', { username, email, password });
        return serverResponse.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || 'Signup failed');
    }
};

export const login = async (email, password) => {
    if(!email) throw new Error('no valid email');
    if(!password) throw new Error('no valid password');
    try {
        const serverResponse = await axios.post('/auth/login', { email, password });
        return serverResponse.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || 'Login failed');
    }
};

export const getCurrentUserData = async () => {
    try {
        const serverResponse = await axios.get('/profile');
        return serverResponse.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || 'Error getting user data');
    }
};

export const changeCurrentUserUsername = async (newUsername) => {
    if(!newUsername) throw new Error('no valid new username');
    try {
        const serverResponse = await axios.put('/profile/username', newUsername);
        return serverResponse.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || 'Error getting user data');
    }
};

export const checkUserAuth = async () => {
  try {
    const serverResponse = await axios.get('/profile/check');
    return serverResponse;
  } catch (err) {
    throw err.response?.data?.error || 'Error checking user authentication';
  }
};