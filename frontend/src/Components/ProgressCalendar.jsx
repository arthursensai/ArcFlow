import { Calendar as CalendarIcon } from 'lucide-react';
import MyCalendar from './MyCalendar';
import { Duration } from 'luxon';
import { useState, useMemo } from 'react';

const ProgressCalendar = ({ habit }) => {
    // Destructure with defaults to prevent undefined errors
    const { 
        title = 'Unknown Habit', 
        streak = 0, 
        totalMinutes: initialTotalMinutes = 0 
    } = habit || {};

    const [totalMinutes, setTotalMinutes] = useState(initialTotalMinutes);

    // Memoize duration calculation to prevent unnecessary recalculations
    const formattedDuration = useMemo(() => {
        if (totalMinutes <= 0) return '0min';
        
        try {
            const duration = Duration.fromObject({ minutes: totalMinutes })
                .shiftTo('years', 'months', 'days', 'hours', 'minutes');
            
            const { years, months, days, hours, minutes } = duration.toObject();
            
            // Build duration string dynamically, only showing non-zero values
            const parts = [];
            if (years > 0) parts.push(`${Math.floor(years)}y`);
            if (months > 0) parts.push(`${Math.floor(months)}m`);
            if (days > 0) parts.push(`${Math.floor(days)}d`);
            if (hours > 0) parts.push(`${Math.floor(hours)}h`);
            if (minutes > 0 || parts.length === 0) parts.push(`${Math.floor(minutes)}min`);
            
            return parts.join(' ');
        } catch (error) {
            console.error('Error formatting duration:', error);
            return `${totalMinutes}min`;
        }
    }, [totalMinutes]);

    return (
        <div className="flex flex-col bg-surface rounded-2xl p-6 border border-primary/20 gap-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <CalendarIcon className="text-accent" size={36} />
                <h2 className="text-xl font-semibold text-text">Progress</h2>
            </div>

            {/* Stats */}
            <div className="border border-primary/30 p-4 rounded-xl bg-background/30">
                <div className="space-y-2">
                    <p className="text-text">
                        <span className="text-muted">Streak:</span> 
                        <span className="ml-2 font-semibold text-success">{streak}</span>
                    </p>
                    <p className="text-text">
                        <span className="text-muted">Total time on</span> 
                        <strong className="ml-1 text-accent">{title}</strong>:
                    </p>
                    <p className="text-lg font-mono text-text pl-4">
                        {formattedDuration}
                    </p>
                </div>
            </div>

            {/* Calendar */}
            {/* delete the comment after getting the MyCalendar component done with actuall data */}
            {/*<MyCalendar />*/}

            <div>
                <p>Coming soon</p>
            </div>
        </div>
    );
};

export default ProgressCalendar;