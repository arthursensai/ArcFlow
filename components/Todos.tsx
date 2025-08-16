import { Todo } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ListTodo } from "lucide-react";

interface TodosProps {
  todos: Todo[];
  habitData: {
    habitTitle: string;
    habitDescription: string;
  };
}

const Todos = ({ todos, habitData }: TodosProps) => {
  return (
    <section className="col-span-2 row-span-5 bg-glass-subtle text-white flex flex-col">
      <div className="flex p-6 gap-4 items-center justify-center">
        <ListTodo />
        {habitData.habitTitle}
      </div>
      <div className="bg-glass-subtle text-white w-full flex-1 p-4 flex flex-col gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex gap-4">
            <Checkbox id={todo.id} defaultChecked={todo.completed} />
            <Label htmlFor={todo.id}>{todo.text}</Label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Todos;
