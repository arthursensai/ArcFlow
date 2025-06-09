import PomodoroTimer from "./PomodoroTimer";
import Todos from "./Todos";

const MiddleHabitSection = ( props ) => {
    const todos = props.habit.todos;
    return (
        <div className="flex flex-col p-6 w-1/3 gap-5">
            <PomodoroTimer />
            <Todos todos={todos}/>
        </div>
    )
};

export default MiddleHabitSection;