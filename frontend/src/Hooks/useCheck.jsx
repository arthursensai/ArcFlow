import { useState, useEffect } from 'react';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const useCheck = () => {
  const [check, setCheck] = useState({});
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(mainUrl + '/auth/check', {
          withCredentials: true,
        });

        if (res.data.loggedIn) {
          setCheck(res.data);
        } else {
          setCheck(null);
        }
      } catch (err) {
        setError(err);
        setCheck({});
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  return { check, checking, error };
};

export default useCheck;