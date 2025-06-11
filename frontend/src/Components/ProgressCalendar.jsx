import { Calendar as CalendarIcon } from 'lucide-react';
import MyCalendar from './MyCalendar';

const ProgressCalendar = (props) => {
    const streak = props.habit.streak
    return (
        <div className="flex flex-col bg-surface rounded-2xl p-6 border border-primary/20 gap-4">
            <div className="flex gap-2 text-center">
                <CalendarIcon className="text-accent text-center" size={36}/>
                <h1 className="text-2xl">Progress</h1>
            </div>
            <div className="">
                <p>Streak: {streak}</p>
            </div>
            <MyCalendar className="self-center"/>
        </div>
    )
};

export default ProgressCalendar;