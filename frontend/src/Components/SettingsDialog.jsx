import * as Dialog from '@radix-ui/react-dialog';
import { X, User, Loader2 } from 'lucide-react';
import useLogout from '../Hooks/useLogout';
import { useState } from 'react';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const SettingsDialog = () => {
    const logout = useLogout();
    const [newUsername, setNewUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changeUsername = async () => {
        if (!newUsername.trim()) {
            setError('Username cannot be empty');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${mainUrl}/profile/changeUsername`, {
                newUsername: newUsername.trim()
            });
            
            setSuccess('Username updated successfully!');
            setNewUsername('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update username');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changeUsername();
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface rounded-lg shadow-xl shadow-glow/10 border border-primary/20 p-6 w-full max-w-md z-50 focus:outline-none">
                <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-semibold text-text">
                        Settings
                    </Dialog.Title>
                    <Dialog.Close asChild>
                        <button className="p-1 rounded-md hover:bg-background/50 hover:shadow-md hover:shadow-glow/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary group">
                            <X className="w-5 h-5 text-muted group-hover:text-text transition-colors duration-300" />
                            <span className="sr-only">Close</span>
                        </button>
                    </Dialog.Close>
                </div>

                <Dialog.Description className="text-sm text-muted mb-6">
                    Manage your account settings below.
                </Dialog.Description>

                {/* Username Change Section */}
                <div className="mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label 
                                htmlFor="newUsername" 
                                className="block text-sm font-medium text-text mb-2"
                            >
                                Change Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                                <input
                                    type="text"
                                    id="newUsername"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="Enter new username"
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-primary/20 rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-error text-sm bg-error/10 border border-error/20 rounded-md p-2">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="text-success text-sm bg-success/10 border border-success/20 rounded-md p-2">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !newUsername.trim()}
                            className="w-full bg-primary hover:bg-accent hover:shadow-lg hover:shadow-primary/30 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:shadow-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Username'
                            )}
                        </button>
                    </form>
                </div>

                {/* Logout Section */}
                <div className="pt-4 border-t border-primary/20">
                    <button
                        onClick={logout}
                        className="w-full bg-error hover:bg-error/90 hover:shadow-lg hover:shadow-error/30 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-surface"
                    >
                        Logout
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default SettingsDialog;