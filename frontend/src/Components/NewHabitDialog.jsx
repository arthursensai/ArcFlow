import * as Dialog from '@radix-ui/react-dialog';
import { X, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const NewHabitDialog = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            status: 'pending',
            firstTodo: ''
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');
        
        try {
            await axios.post('http://localhost:5000/profile/createHabit', data);
            
            // Show success message
            setShowSuccess(true);
            reset(); // Clear form after successful submission
            
            // Close dialog after a brief delay to show success message
            setTimeout(() => {
                setShowSuccess(false);
                if (onClose) onClose();
            }, 1500);
            
        } catch (error) {
            console.error('Error creating habit:', error);
            setSubmitError(error.response?.data?.message || 'Failed to create habit');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface rounded-xl shadow-2xl shadow-glow/20 border border-primary/30 p-6 w-full max-w-md z-50 focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Plus className="w-4 h-4 text-surface" />
                        </div>
                        <Dialog.Title className="text-xl font-semibold text-text">
                            Add New Habit
                        </Dialog.Title>
                    </div>
                    <Dialog.Close asChild>
                        <button className="p-2 rounded-lg hover:bg-background/50 hover:shadow-lg hover:shadow-glow/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group">
                            <X className="w-5 h-5 text-muted group-hover:text-text transition-colors duration-300" />
                            <span className="sr-only">Close</span>
                        </button>
                    </Dialog.Close>
                </div>

                <Dialog.Description className="text-sm text-muted mb-6 leading-relaxed">
                    Create a new habit to track your progress and build consistency in your daily routine.
                </Dialog.Description>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                            <p className="text-sm text-success font-medium">Habit created successfully!</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {submitError && (
                    <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg backdrop-blur-sm">
                        <p className="text-sm text-error">{submitError}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title Field */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-text flex items-center gap-1">
                            Habit Title
                            <span className="text-error">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="title" 
                            {...register('title', { 
                                required: 'Title is required',
                                minLength: {
                                    value: 2,
                                    message: 'Title must be at least 2 characters'
                                }
                            })}
                            className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:shadow-sm hover:shadow-glow/10 hover:bg-background/70 ${
                                errors.title ? 'border-error/50 focus:ring-error/50 focus:border-error/50' : 'border-primary/20'
                            }`}
                            placeholder="e.g., Read for 30 minutes"
                        />
                        {errors.title && (
                            <p className="text-xs text-error mt-1 flex items-center gap-1">
                                <div className="w-1 h-1 bg-error rounded-full"></div>
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    
                    {/* Description Field */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-text flex items-center gap-1">
                            Description
                            <span className="text-error">*</span>
                        </label>
                        <textarea 
                            id="description" 
                            rows={3}
                            {...register('description', { 
                                required: 'Description is required',
                                minLength: {
                                    value: 5,
                                    message: 'Description must be at least 5 characters'
                                }
                            })}
                            className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:shadow-sm hover:shadow-glow/10 hover:bg-background/70 resize-none ${
                                errors.description ? 'border-error/50 focus:ring-error/50 focus:border-error/50' : 'border-primary/20'
                            }`}
                            placeholder="Describe your habit and why it's important to you..."
                        />
                        {errors.description && (
                            <p className="text-xs text-error mt-1 flex items-center gap-1">
                                <div className="w-1 h-1 bg-error rounded-full"></div>
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    
                    {/* Status Field */}
                    <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium text-text">
                            Initial Status
                        </label>
                        <select 
                            id="status"
                            {...register('status')}
                            className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:shadow-sm hover:shadow-glow/10 hover:bg-background/70 cursor-pointer"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="missed">Missed</option>
                        </select>
                    </div>
                    
                    {/* First Todo Field */}
                    <div className="space-y-2">
                        <label htmlFor="firstTodo" className="text-sm font-medium text-text">
                            First Action Step
                        </label>
                        <input 
                            type="text" 
                            id="firstTodo"
                            {...register('firstTodo', {
                                minLength: {
                                    value: 3,
                                    message: 'Action step must be at least 3 characters'
                                }
                            })}
                            className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:shadow-sm hover:shadow-glow/10 hover:bg-background/70 ${
                                errors.firstTodo ? 'border-error/50 focus:ring-error/50 focus:border-error/50' : 'border-primary/20'
                            }`}
                            placeholder="e.g., Choose a book and set a timer"
                        />
                        {errors.firstTodo && (
                            <p className="text-xs text-error mt-1 flex items-center gap-1">
                                <div className="w-1 h-1 bg-error rounded-full"></div>
                                {errors.firstTodo.message}
                            </p>
                        )}
                        <p className="text-xs text-muted">Optional: Add a specific first step to get started</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Dialog.Close asChild>
                            <button 
                                type="button"
                                disabled={isSubmitting || showSuccess}
                                className="flex-1 px-4 py-3 bg-background/50 border border-primary/20 rounded-lg text-muted hover:text-text hover:bg-background/70 hover:shadow-lg hover:shadow-glow/20 hover:border-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                Cancel
                            </button>
                        </Dialog.Close>
                        <button 
                            type="submit"
                            disabled={isSubmitting || showSuccess}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent text-surface rounded-lg hover:from-primary/90 hover:to-accent/90 hover:shadow-lg hover:shadow-glow/30 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {showSuccess ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 bg-surface rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-success rounded-full"></div>
                                    </div>
                                    Created!
                                </span>
                            ) : isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin"></div>
                                    Creating...
                                </span>
                            ) : (
                                'Create Habit'
                            )}
                        </button>
                    </div>
                </form>
                
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default NewHabitDialog;