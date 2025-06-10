import * as Dialog from '@radix-ui/react-dialog';
import { X, Target, TrendingUp, Calendar, ChevronRight, Plus, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import HabitStatusIcon from './HabitStatusIcon';
import { Link } from 'react-router-dom';
import { setCurrentHabit } from '../Utils/CookieUtil';

const HabitsDialog = (props) => {
    const habits = props.habits || [];
    
    const getStatusCount = (status) => {
        return habits.filter(habit => habit.status === status).length;
    };

    const getStatusIcon = (status) => {
        const icons = {
            completed: CheckCircle2,
            pending: Clock,
            missed: XCircle
        };
        return icons[status] || AlertCircle;
    };

    const getStatusConfig = (status) => {
        const configs = {
            completed: {
                color: 'text-success',
                bgColor: 'bg-success/10',
                borderColor: 'border-success/30',
                glowColor: 'shadow-success/20',
                icon: CheckCircle2
            },
            pending: {
                color: 'text-warning',
                bgColor: 'bg-warning/10',
                borderColor: 'border-warning/30',
                glowColor: 'shadow-warning/20',
                icon: Clock
            },
            missed: {
                color: 'text-error',
                bgColor: 'bg-error/10',
                borderColor: 'border-error/30',
                glowColor: 'shadow-error/20',
                icon: XCircle
            }
        };
        return configs[status] || {
            color: 'text-muted',
            bgColor: 'bg-muted/10',
            borderColor: 'border-muted/30',
            glowColor: 'shadow-muted/20',
            icon: AlertCircle
        };
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 animate-in fade-in-0" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-surface to-surface/95 rounded-2xl shadow-2xl shadow-glow/30 border border-primary/20 p-0 w-[95vw] sm:w-full max-w-2xl z-50 focus:outline-none max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
                
                {/* Header with Gradient Background */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-glow rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <Dialog.Title className="text-2xl font-bold text-text mb-1">
                                    Your Habits
                                </Dialog.Title>
                                <p className="text-sm text-muted/80">
                                    {habits.length} habit{habits.length !== 1 ? 's' : ''} tracked today
                                </p>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button 
                                className="p-3 rounded-xl hover:bg-background/30 hover:shadow-lg hover:shadow-glow/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group border border-primary/10"
                                aria-label="Close dialog"
                            >
                                <X className="w-6 h-6 text-muted group-hover:text-text transition-colors duration-300" />
                            </button>
                        </Dialog.Close>
                    </div>
                </div>

                {/* Enhanced Stats Overview */}
                {habits.length > 0 && (
                    <div className="p-6 pb-4">
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { status: 'completed', label: 'Completed', description: 'Well done!' },
                                { status: 'pending', label: 'Pending', description: 'Keep going!' },
                                { status: 'missed', label: 'Missed', description: 'Try again' }
                            ].map(({ status, label, description }) => {
                                const config = getStatusConfig(status);
                                const Icon = config.icon;
                                const count = getStatusCount(status);
                                
                                return (
                                    <div key={status} className={`${config.bgColor} ${config.borderColor} rounded-xl p-4 text-center border-2 hover:shadow-lg ${config.glowColor} transition-all duration-300 hover:scale-105`}>
                                        <div className="flex items-center justify-center mb-2">
                                            <Icon className={`w-5 h-5 ${config.color}`} />
                                        </div>
                                        <div className={`text-2xl font-bold ${config.color} mb-1`}>
                                            {count}
                                        </div>
                                        <div className="text-sm font-medium text-text mb-1">{label}</div>
                                        <div className="text-xs text-muted/70">{description}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col px-6">
                    <Dialog.Description className="text-sm text-muted/80 mb-4 font-medium">
                        {habits.length > 0 ? 'Select a habit to view details and update your progress:' : 'Ready to start your journey? Create your first habit below!'}
                    </Dialog.Description>

                    {/* Habits List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pb-6 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                        {habits.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                                    <Calendar className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-text mb-2">No habits yet</h3>
                                <p className="text-muted/70 mb-8 max-w-sm mx-auto leading-relaxed">
                                    Transform your daily routine by creating meaningful habits that stick. Start small, think big.
                                </p>
                                
                                <Link 
                                    to="/create-habit"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface"
                                >
                                    <Plus className="w-5 h-5" />
                                    Create Your First Habit
                                </Link>
                            </div>
                        ) : (
                            habits.map((habit, index) => {
                                const config = getStatusConfig(habit.status);
                                
                                return (
                                    <Link 
                                        key={habit._id}
                                        to="/habit"
                                        onClick={() => setCurrentHabit(habit._id)}
                                        className={`group block p-5 bg-gradient-to-r from-background/30 to-background/10 hover:from-background/50 hover:to-background/30 border ${config.borderColor} hover:border-primary/40 rounded-xl transition-all duration-300 hover:shadow-lg ${config.glowColor} hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 animate-in slide-in-from-bottom-4`}
                                        style={{ animationDelay: `${Math.min(index * 100, 400)}ms` }}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center border ${config.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                                                <HabitStatusIcon status={habit.status} />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors duration-300 truncate">
                                                        {habit.title}
                                                    </h3>
                                                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                                </div>
                                                
                                                {habit.description && (
                                                    <p className="text-sm text-muted/80 group-hover:text-muted transition-colors duration-300 line-clamp-2 mb-3 leading-relaxed">
                                                        {habit.description}
                                                    </p>
                                                )}
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-muted" />
                                                        <span className="text-sm text-muted font-medium">Track Progress</span>
                                                    </div>
                                                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${config.bgColor} ${config.color} ${config.borderColor}`}>
                                                        {habit.status.charAt(0).toUpperCase() + habit.status.slice(1)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Enhanced Footer */}
                {habits.length > 0 && (
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-t border-primary/20 p-6">
                        <div className="flex items-center justify-center gap-3 text-sm text-muted/80">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                            <span className="font-medium">Click any habit to view details and update progress</span>
                            <div className="w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse"></div>
                        </div>
                    </div>
                )}
                
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default HabitsDialog;