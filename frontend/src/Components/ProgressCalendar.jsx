import { Calendar as CalendarIcon } from 'lucide-react';
import MyCalendar from './MyCalendar';

const ProgressCalendar = () => {
    return (
        <div className="bg-surface rounded-2xl p-6 border border-primary/20 w-1/4">
            <div className="flex gap-2 text-center">
                <CalendarIcon className="text-accent text-center" size={36}/>
                <h1 className="text-2xl">Progress</h1>
            </div>
            <div>
                <p>Streak:</p>
            </div>
            <MyCalendar />
        </div>
    )
};

export default ProgressCalendar;