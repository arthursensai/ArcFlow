import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Importance = "high" | "medium" | "low";

interface Habit {
  id: number;
  title: string;
  totalTodos: number;
}

interface Todo {
  habitID: number,
  id: number;
  text: string;
  completed: boolean;
  importance: Importance;
}

const habitsDB: Habit[] = [
  { id: 1, title: "coding", totalTodos: 4 },
  { id: 2, title: "reading", totalTodos: 4 },
  { id: 3, title: "fitness", totalTodos: 3 },
  { id: 4, title: "Quran", totalTodos: 2 },
  { id: 5, title: "content creation", totalTodos: 3 },
];

const todosDB: Todo[] = [
  // Coding
  {
    habitID: 1,
    id: 1,
    text: "Learn Next",
    completed: true,
    importance: "high",
  },
  {
    habitID: 1,
    id: 2,
    text: "Code for 30 minutes",
    completed: false,
    importance: "low",
  },
  {
    habitID: 1,
    id: 3,
    text: "Review pull requests",
    completed: false,
    importance: "medium",
  },
  {
    habitID: 1,
    id: 4,
    text: "Deploy ArcFlow backend",
    completed: true,
    importance: "high",
  },

  // Reading
  {
    habitID: 2,
    id: 5,
    text: "Read 30 pages",
    completed: false,
    importance: "low",
  },
  {
    habitID: 2,
    id: 6,
    text: "Write main ideas",
    completed: false,
    importance: "low",
  },
  {
    habitID: 2,
    id: 7,
    text: "Summarize chapter",
    completed: true,
    importance: "medium",
  },
  {
    habitID: 2,
    id: 8,
    text: "Highlight quotes",
    completed: true,
    importance: "low",
  },

  // Fitness
  {
    habitID: 3,
    id: 9,
    text: "Push-ups",
    completed: true,
    importance: "medium",
  },
  {
    habitID: 3,
    id: 10,
    text: "Stretching",
    completed: false,
    importance: "low",
  },
  {
    habitID: 3,
    id: 11,
    text: "Leg workout",
    completed: false,
    importance: "high",
  },

  // Quran
  {
    habitID: 4,
    id: 12,
    text: "Memorize 5 ayat",
    completed: true,
    importance: "high",
  },
  {
    habitID: 4,
    id: 13,
    text: "Revise previous page",
    completed: false,
    importance: "medium",
  },

  // Content creation
  {
    habitID: 5,
    id: 14,
    text: "Design TeePublic shirt",
    completed: true,
    importance: "medium",
  },
  {
    habitID: 5,
    id: 15,
    text: "Edit short video",
    completed: false,
    importance: "medium",
  },
  {
    habitID: 5,
    id: 16,
    text: "Post on Instagram",
    completed: false,
    importance: "high",
  },
];

const Habits = () => {
  const habits: Habit[] = habitsDB;
  const todos: Todo[] = todosDB;
  const streak: number = 0;

  return (
    <Card className="bg-glass-dark text-amber-50 flex w-10/12 self-center flex-col h-max p-10 rounded-3xl">
      <CardHeader>
        <CardTitle>Habits</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {habits.map((habit, index) => (
          <div key={index} className="bg-glass-cyan p-4">
            <h2>{habit.title}</h2>
            <span>{todos.map((todo) => (todo.completed ? "1" : "0"))}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <p>StreaK: {streak}</p>
      </CardFooter>
    </Card>
  );
};

export default Habits;
