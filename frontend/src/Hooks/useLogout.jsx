import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(mainUrl + '/auth/logout', {
        withCredentials: true,
      });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return logout;
};

export default useLogout;