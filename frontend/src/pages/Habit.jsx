import useHabit from '../Hooks/useHabit';
import MusicPanel from '../Components/MusicPanel';
import MiddleHabitSection from '../Components/MiddleHabitSection';
import ProgressCalendar from '../Components/ProgressCalendar';

const Habit = () => {
    const { habitData, habitDataLoading, habitDataError } = useHabit();
    if(habitDataLoading){ return <p>loading data...</p>}
    if(habitData == null){ return <p>Something went wrong, Try again...</p>}
    return (
        <section className="min-h-screen flex w-full justify-around bg-background p-2">
            <MusicPanel />
                <MiddleHabitSection habit={habitData}/>  
                <ProgressCalendar />
        </section>
    )
};

export default Habit;