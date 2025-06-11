import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useLogin from '../Hooks/useLogin';
import useSignup from '../Hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { signup, errors: signupErrors, loading: signupLoading } = useSignup();
    const { login, errors: loginErrors, loading: loginLoading } = useLogin();
    const [authErrors, setAuthErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: {errors}, watch, reset } = useForm({ 
        mode: "onChange" 
    });

    const handleAuth = async (data) => {
        setAuthErrors({});
        setSuccessMessage('');
        
        // Clear any previous form errors
        Object.keys(errors).forEach(key => {
            setError(key, { message: '' });
        });
        
        // Remove confirmPassword from data when logging in
        const authData = isLogin ? 
            { email: data.email, password: data.password } : 
            { username: data.username, email: data.email, password: data.password };
        
        if (isLogin) {
            const loginResponse = await login(authData);
            if (loginResponse?.success) {
                setSuccessMessage("Login successful!");
                navigate('/dashboard');
            } else {
                const errors = loginResponse.errors || {};
                
                // Set field-specific errors
                if (errors.email) {
                    setError('email', { message: errors.email });
                }
                if (errors.password) {
                    setError('password', { message: errors.password });
                }
                
                // Set general errors for display
                if (errors.general) {
                    setAuthErrors({ general: errors.general });
                } else if (!errors.email && !errors.password) {
                    setAuthErrors({ general: "Login failed. Please try again." });
                }
            }
        } else {
            const result = await signup(authData);
            if (result?.success) {
                setSuccessMessage("Account created successfully!");
                console.log("Signup success!");
                navigate('/dashboard');
            } else {
                const errors = result.errors || {};
                
                // Set field-specific errors
                if (errors.email) {
                    setError('email', { message: errors.email });
                }
                if (errors.username) {
                    setError('username', { message: errors.username });
                }
                if (errors.password) {
                    setError('password', { message: errors.password });
                }
                
                // Set general errors for display
                if (errors.general) {
                    setAuthErrors({ general: errors.general });
                } else if (!errors.email && !errors.username && !errors.password) {
                    setAuthErrors({ general: "Signup failed. Please try again." });
                }
            }
        }
    };

    const handleModeSwitch = (loginMode) => {
        setIsLogin(loginMode);
        setAuthErrors({});
        setSuccessMessage('');
        reset(); // Clear form when switching modes
    };

    const isLoading = signupLoading || loginLoading;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">
                        <span className="text-cyan-400 drop-shadow-lg">A</span>rc<span className="text-cyan-400 drop-shadow-lg">F</span>low
                    </h1>
                    <p className="text-slate-300 text-sm">Welcome back to your habit journey</p>
                </div>

                {/* Form Container */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-lg">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                            {successMessage}
                        </div>
                    )}

                    {/* Error Messages */}
                    {Object.keys(authErrors).length > 0 && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {Object.values(authErrors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    {/* Toggle Buttons */}
                    <div className="flex bg-slate-700/50 rounded-lg p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => handleModeSwitch(true)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                                isLogin 
                                    ? 'bg-cyan-500 text-white shadow-md' 
                                    : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => handleModeSwitch(false)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                                !isLogin 
                                    ? 'bg-cyan-500 text-white shadow-md' 
                                    : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Username Field (only for signup) */}
                        {!isLogin && (
                            <div className="relative">
                                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    {...register("username", { 
                                        required: "Username is required",
                                        minLength: { value: 3, message: "Username must be at least 3 characters" }
                                    })}
                                    placeholder="Username"
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                        errors.username 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-slate-600 focus:ring-cyan-500'
                                    }`}
                                />
                                {errors.username && (
                                    <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
                                )}
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="relative">
                            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="Email Address"
                                className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                    errors.email 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-slate-600 focus:ring-cyan-500'
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { 
                                    required: "Password is required", 
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                placeholder="Password"
                                className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                    errors.password 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-slate-600 focus:ring-cyan-500'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field (only for signup) */}
                        {!isLogin && (
                            <div className="relative">
                                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                        errors.confirmPassword 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-slate-600 focus:ring-cyan-500'
                                    }`}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) =>
                                            value === watch("password") || "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit(handleAuth)}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 mt-6"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                                </div>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </div>

                    {/* Additional Options */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => handleModeSwitch(!isLogin)}
                                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                                {isLogin ? 'Sign up here' : 'Sign in here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;