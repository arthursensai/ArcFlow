import { Settings, Plus } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import SettingsDialog from './SettingsDialog';
import NewHabitDialog from './NewHabitDialog';
import useQuote from '../Hooks/useQuote';

const Footer = () => {
    const { quote, author, quoteError } = useQuote();
    return (
        <footer className="fixed bottom-0 left-0 right-0 px-6 py-4 border-t-2 border-primary bg-surface/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Quote Section */}
                <div className="flex-1 min-w-0 pr-6">
                    {!quoteError && quote ? (
                        <div className="space-y-1">
                            <p className="text-lg text-foreground leading-relaxed line-clamp-2">
                                "{quote}"
                            </p>
                            {author && (
                                <p className="text-sm text-muted font-medium">
                                    — {author}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="text-sm text-muted/60">
                            {quoteError ? 'Quote unavailable' : 'Loading quote...'}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    {/* new habit Button */}
                    <div className="flex-shrink-0">
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="p-3 rounded-lg bg-surface border border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-glow/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface group cursor-pointer">
                                    <Plus className="w-5 h-5 text-muted group-hover:text-primary transition-colors duration-300" />
                                    <span className="sr-only">Open settings</span>
                                </button>
                            </Dialog.Trigger>
                            <NewHabitDialog />
                        </Dialog.Root>
                    </div>

                    {/* Settings Button */}
                    <div className="flex-shrink-0">
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="p-3 rounded-lg bg-surface border border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-glow/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface group cursor-pointer">
                                    <Settings className="w-5 h-5 text-muted group-hover:text-primary transition-colors duration-300" />
                                    <span className="sr-only">Open settings</span>
                                </button>
                            </Dialog.Trigger>
                            <SettingsDialog />
                        </Dialog.Root>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;