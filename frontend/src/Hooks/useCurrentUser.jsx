import { useState, useEffect } from 'react';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    axios.get(`${mainUrl}/profile`)
      .then(res => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser(null);
        setUserError(err);
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
};

export default useCurrentUser;
