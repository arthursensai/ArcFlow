import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { X, Target, TrendingUp, Calendar, ChevronRight, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setCurrentHabit } from '../Utils/CookieUtil';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const HabitsDialog = (props) => {
    const habits = props.habits || [];

    const onDeleteHabit = (habitID) => {
        try {
            axios.delete(`${mainUrl}/habit/${habitID}`,);
        } catch (err) {
            console.log(err);
        }
    };
    
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (e, habit) => {
        e.preventDefault();
        e.stopPropagation();
        setHabitToDelete(habit);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!habitToDelete) return;
        setIsDeleting(true);
        try {
            await onDeleteHabit(habitToDelete._id);
            setDeleteConfirmOpen(false);
            setHabitToDelete(null);
        } catch (error) {
            console.error('Failed to delete habit:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmOpen(false);
        setHabitToDelete(null);
    };

    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in-0 duration-300" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-surface via-background to-surface rounded-3xl shadow-2xl shadow-black/50 border border-surface/50 p-0 w-[95vw] sm:w-full max-w-2xl z-50 focus:outline-none max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
                    
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-surface/50 p-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm"></div>
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-glow rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 border border-white/10">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-glow rounded-2xl blur-xl opacity-30 -z-10"></div>
                                </div>
                                <div>
                                    <Dialog.Title className="text-3xl font-bold bg-gradient-to-r from-text to-muted bg-clip-text text-transparent mb-2">
                                        Your Habits
                                    </Dialog.Title>
                                    <p className="text-muted font-medium">
                                        {habits.length} habit{habits.length !== 1 ? 's' : ''} in your journey
                                    </p>
                                </div>
                            </div>
                            <Dialog.Close asChild>
                                <button 
                                    className="p-3 rounded-xl bg-surface/50 hover:bg-surface/70 border border-surface/50 hover:border-muted/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group backdrop-blur-sm"
                                    aria-label="Close dialog"
                                >
                                    <X className="w-6 h-6 text-muted group-hover:text-text transition-colors duration-300" />
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden flex flex-col p-8">
                        {habits.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center max-w-md">
                                    <div className="relative mb-8">
                                        <div className="w-32 h-32 bg-gradient-to-br from-primary/20 via-accent/20 to-glow/20 rounded-3xl flex items-center justify-center mx-auto border border-surface/30">
                                            <Calendar className="w-16 h-16 text-muted" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-text mb-4">Ready to build greatness?</h3>
                                    <p className="text-muted mb-10 leading-relaxed text-lg">
                                        Every expert was once a beginner. Start your transformation journey with your first habit.
                                    </p>
                                    
                                    <Link 
                                        to="/create-habit"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-accent to-glow text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <Plus className="w-6 h-6 relative z-10" />
                                        <span className="relative z-10">Create Your First Habit</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <p className="text-text text-lg font-medium">
                                        Select a habit to track your progress
                                    </p>
                                </div>

                                {/* Habits Grid */}
                                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-surface scrollbar-track-transparent">
                                    {habits.map((habit, index) => {
                                        return (
                                            <div 
                                                key={habit._id}
                                                className={`group relative p-6 bg-gradient-to-r from-surface/60 to-surface/40 hover:from-surface/80 hover:to-surface/60 border border-surface/50 hover:border-primary/40 rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] animate-in slide-in-from-bottom-4 backdrop-blur-sm`}
                                                style={{ animationDelay: `${Math.min(index * 100, 400)}ms` }}
                                            >
                                                {/* Delete Button */}
                                                <button
                                                    onClick={(e) => handleDeleteClick(e, habit)}
                                                    className="absolute top-4 right-4 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 bg-error/10 hover:bg-error/20 border border-error/30 hover:border-error/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-error/50 z-10 backdrop-blur-sm"
                                                    aria-label={`Delete ${habit.title}`}
                                                    title="Delete habit"
                                                >
                                                    <Trash2 className="w-5 h-5 text-error" />
                                                </button>

                                                {/* Habit Content */}
                                                <Link 
                                                    to="/habit"
                                                    onClick={() => setCurrentHabit(habit._id)}
                                                    className="block focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-xl"
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    <div className="flex items-start gap-5 pr-16">
                                                        <div className={`relative w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm`}>
                                                            <Target className="w-8 h-8 text-primary" />
                                                            <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-300`}></div>
                                                        </div>
                                                        
                                                        <div className="flex-1 min-w-0 pt-1">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <h3 className="font-bold text-xl text-text group-hover:text-primary transition-colors duration-300 truncate pr-4">
                                                                    {habit.title}
                                                                </h3>
                                                                <ChevronRight className="w-6 h-6 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                                                            </div>
                                                            
                                                            {habit.description && (
                                                                <p className="text-muted group-hover:text-text transition-colors duration-300 line-clamp-2 mb-4 leading-relaxed">
                                                                    {habit.description}
                                                                </p>
                                                            )}
                                                            
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <TrendingUp className="w-5 h-5 text-muted" />
                                                                    <span className="text-muted font-medium">Track Progress</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>

            {/* Delete Confirmation Dialog */}
            <Dialog.Root open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in-0" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-surface to-background rounded-2xl shadow-2xl shadow-error/20 border border-error/30 p-0 w-[90vw] max-w-md z-50 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-300">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-r from-error/10 to-error/5 border-b border-error/20 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-error/20 to-error/10 rounded-xl flex items-center justify-center border border-error/30">
                                    <AlertTriangle className="w-6 h-6 text-error" />
                                </div>
                                <div>
                                    <Dialog.Title className="text-xl font-bold text-text mb-1">
                                        Delete Habit
                                    </Dialog.Title>
                                    <p className="text-sm text-muted">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-text mb-2">
                                Are you sure you want to delete <strong className="text-primary">"{habitToDelete?.title}"</strong>?
                            </p>
                            <p className="text-sm text-muted mb-6">
                                All progress and data associated with this habit will be permanently removed.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={handleCancelDelete}
                                    disabled={isDeleting}
                                    className="px-6 py-3 text-sm font-medium bg-surface/50 hover:bg-surface/70 border border-surface/50 hover:border-muted/50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed text-text"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={isDeleting}
                                    className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-error to-error/80 hover:from-error/90 hover:to-error text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-error/30 focus:outline-none focus:ring-2 focus:ring-error/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Delete Habit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};

export default HabitsDialog;