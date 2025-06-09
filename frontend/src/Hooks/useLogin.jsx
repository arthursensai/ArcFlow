import { useState } from 'react';
import axios from 'axios';

const loginUrl = `${import.meta.env.VITE_API_URL}/auth/login`;
axios.defaults.withCredentials = true;

const useLogin = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (loginData) => {
    setLoading(true);
    setErrors(null);

    try {
        const response = await axios.post(loginUrl, loginData);
        setData(response.data);
        
        return { success: true, data: response.data };
    } catch (err) {
        let errorData = {};
        
        if (err.response?.data) {
            // Handle different error response formats
            if (err.response.data.message) {
                // Single message from backend
                const message = err.response.data.message.toLowerCase();
                
                if (message.includes('email') && (message.includes('not found') || message.includes('invalid'))) {
                    errorData.email = "No account found with this email address.";
                } else if (message.includes('password') && message.includes('incorrect')) {
                    errorData.password = "Incorrect password. Please try again.";
                } else if (message.includes('credentials') && message.includes('invalid')) {
                    errorData.general = "Invalid email or password. Please check your credentials.";
                } else if (message.includes('account') && message.includes('locked')) {
                    errorData.general = "Account is temporarily locked. Please try again later.";
                } else {
                    errorData.general = err.response.data.message;
                }
            } else if (err.response.data.errors) {
                errorData = err.response.data.errors;
            } else {
                errorData.general = "Login failed. Please try again.";
            }
        } else if (err.code === 'NETWORK_ERROR' || err.message.includes('Network Error')) {
            errorData.general = "Network error. Please check your connection and try again.";
        } else {
            errorData.general = "Login failed. Please try again.";
        }
        
        setErrors(errorData);
        return { success: false, errors: errorData };
    } finally {
        setLoading(false);
    }
  };

  return { login, data, errors, loading };
};

export default useLogin;