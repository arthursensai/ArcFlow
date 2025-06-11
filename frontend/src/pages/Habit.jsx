import useHabit from '../Hooks/useHabit';
import MiddleHabitSection from '../Components/MiddleHabitSection';
import ProgressCalendar from '../Components/ProgressCalendar';
import TodosPanel from '../Components/TodosPanel';

const Habit = () => {
    const { habitData, habitDataLoading, habitDataError } = useHabit();
    const todos = habitData.todos;
    console.log(habitData)
    console.log('todos:' + todos)
    if(habitDataLoading){ return <p>loading data...</p>}
    if(habitData == null){ return <p>Something went wrong, Try again...</p>}
    return (
        <section className="min-h-screen grid grid-cols-3 grid-rows-1 gap-8 w-full bg-background p-2">
            <TodosPanel todos={todos}/>
            <MiddleHabitSection habit={habitData}/>  
            <ProgressCalendar habit={habitData}/>
        </section>
    )
};

export default Habit;