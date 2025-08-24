import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProgressCalendar from "@/components/Calendar";
import Todos from "@/components/Todos";

const page = async ({
  params,
}: {
  params: Promise<{ habitID: string[] }>;
}) => {
  const { habitID } = await params;
  const habitId = habitID[0];

  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/auth");
  }

  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
        userID: session.user.id,
      },
      include: { todos: true },
    });

    if (!habit) {
      return <div>Habit not found</div>;
    }

    return (
      <main className="grid grid-cols-6 grid-rows-5 gap-4 min-h-screen main-bg p-4">
        <Todos
          todos={habit.todos}
          habitData={{
            habitTitle: habit.title,
            habitDescription: habit.description,
          }}
        />
        <ProgressCalendar />
        <div className="">3</div>
        <div className="col-span-2 row-span-3 col-start-3 row-start-3">4</div>
        <Card className="col-span-2 row-span-2 col-start-3 row-start-1 bg-glass-subtle text-white w-full">
          <CardHeader>
            <CardTitle className="font-black text-3xl">{habit.title}</CardTitle>
            <CardDescription className="!text-white/80">
              {habit.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  } catch (error) {
    console.error("Error fetching habit:", error);
    return <div>Error loading habit</div>;
  }
}

export default page;