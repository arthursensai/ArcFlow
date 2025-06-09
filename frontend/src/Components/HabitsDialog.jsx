import * as Dialog from '@radix-ui/react-dialog';
import { X, Target, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import HabitStatusIcon from './HabitStatusIcon';
import { Link } from 'react-router-dom';
import { setCurrentHabit } from '../Utils/CookieUtil';

const HabitsDialog = (props) => {
    const habits = props.habits || [];
    
    const getStatusCount = (status) => {
        return habits.filter(habit => habit.status === status).length;
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'text-warning',
            completed: 'text-success',
            missed: 'text-error'
        };
        return colors[status] || 'text-muted';
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface rounded-xl shadow-2xl shadow-glow/20 border border-primary/30 p-6 w-full max-w-lg z-50 focus:outline-none max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-surface" />
                        </div>
                        <div>
                            <Dialog.Title className="text-xl font-semibold text-text">
                                Your Habits
                            </Dialog.Title>
                            <p className="text-xs text-muted">
                                {habits.length} habit{habits.length !== 1 ? 's' : ''} tracked
                            </p>
                        </div>
                    </div>
                    <Dialog.Close asChild>
                        <button className="p-2 rounded-lg hover:bg-background/50 hover:shadow-lg hover:shadow-glow/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group">
                            <X className="w-5 h-5 text-muted group-hover:text-text transition-colors duration-300" />
                            <span className="sr-only">Close</span>
                        </button>
                    </Dialog.Close>
                </div>

                {/* Stats Overview */}
                {habits.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-background/30 rounded-lg p-3 text-center border border-primary/10">
                            <div className={`text-lg font-semibold ${getStatusColor('completed')}`}>
                                {getStatusCount('completed')}
                            </div>
                            <div className="text-xs text-muted">Completed</div>
                        </div>
                        <div className="bg-background/30 rounded-lg p-3 text-center border border-primary/10">
                            <div className={`text-lg font-semibold ${getStatusColor('pending')}`}>
                                {getStatusCount('pending')}
                            </div>
                            <div className="text-xs text-muted">Pending</div>
                        </div>
                        <div className="bg-background/30 rounded-lg p-3 text-center border border-primary/10">
                            <div className={`text-lg font-semibold ${getStatusColor('missed')}`}>
                                {getStatusCount('missed')}
                            </div>
                            <div className="text-xs text-muted">Missed</div>
                        </div>
                    </div>
                )}

                <Dialog.Description className="text-sm text-muted mb-4">
                    {habits.length > 0 ? 'Choose a habit to view details and track progress:' : 'No habits found. Create your first habit to get started!'}
                </Dialog.Description>

                {/* Habits List */}
                <div className="flex-1 overflow-y-auto space-y-3 max-h-96">
                    {habits.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-background/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-muted" />
                            </div>
                            <p className="text-muted text-sm mb-2">No habits yet</p>
                            <p className="text-xs text-muted/70">Start building your routine by creating your first habit</p>
                        </div>
                    ) : (
                        habits.map((habit, index) => (
                            <Link 
                                key={habit._id}
                                to="/habit"
                                onClick={() => setCurrentHabit(habit._id)}
                                className="group block p-4 bg-background/20 hover:bg-background/40 border border-primary/20 hover:border-primary/40 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-glow/20 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'fadeInUp 0.5s ease-out forwards'
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <HabitStatusIcon status={habit.status} />
                                            <h3 className="font-semibold text-text group-hover:text-primary transition-colors duration-300 truncate">
                                                {habit.title}
                                            </h3>
                                        </div>
                                        {habit.description && (
                                            <p className="text-xs text-muted line-clamp-2 group-hover:text-muted/80 transition-colors duration-300">
                                                {habit.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3 text-muted" />
                                                <span className="text-xs text-muted">Progress</span>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                                habit.status === 'completed' 
                                                    ? 'bg-success/10 text-success border-success/20' 
                                                    : habit.status === 'pending'
                                                    ? 'bg-warning/10 text-warning border-warning/20'
                                                    : 'bg-error/10 text-error border-error/20'
                                            }`}>
                                                {habit.status.charAt(0).toUpperCase() + habit.status.slice(1)}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-3" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Footer Actions */}
                {habits.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-primary/20">
                        <div className="flex items-center justify-center gap-2 text-xs text-muted">
                            <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                            <span>Click any habit to view details and update progress</span>
                        </div>
                    </div>
                )}
                
            </Dialog.Content>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </Dialog.Portal>
    );
};

export default HabitsDialog;