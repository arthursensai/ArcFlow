import { ListTodo , CheckCircle2, Plus, X, AlertCircle, Loader2 } from 'lucide-react';
import TodosComponent from './TodosComponent';
import MusicPanel from "./MusicPanel";

const Todos = (props) => {
  console.log(props.todos)

  return (
    <div className="flex flex-col bg-surface rounded-2xl p-6 border border-primary/20 gap-4">
      <div className="flex gap-2 text-center">
        <ListTodo  className="text-accent text-center" size={36}/>
        <h1 className="text-2xl">Progress</h1>
      </div>
      <TodosComponent todos={props.todos}/>
      <MusicPanel />
    </div>
  );
};

export default Todos;