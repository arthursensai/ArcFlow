import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: mainUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;