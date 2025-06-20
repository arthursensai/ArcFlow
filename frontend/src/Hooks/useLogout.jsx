import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const logoutUrl = `${import.meta.env.VITE_API_URL}/auth/logout`;
axios.defaults.withCredentials = true;

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(logoutUrl, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (err) {
      //add ui/ux
      console.error('Logout failed:', err);
    }
  };

  return logout;
};

export default useLogout;