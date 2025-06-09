import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import useLogout from '../Hooks/useLogout';

const SettingsDialog = () => {
    const logout = useLogout();
    
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

                <div className="space-y-4">
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