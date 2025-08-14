import prisma from "@/lib/prisma";

interface HabitPageProps {
  params: {
    habitID: string[];
  };
}

const page = async ({ params }: HabitPageProps) => {
  const resolvedParams = await params;
  const habitId = resolvedParams.habitID[0];

  const habit = await prisma.habit.findUnique({ where: { id: habitId } });

  if (!habitId) {
    return <div>No habit ID provided</div>;
  }

  return (
    <div>
      <h1>Habit ID: {habitId}</h1>
        <h1>{habit?.title}</h1>
        <p>{habit?.description}</p>
    </div>
  );
};

export default page;
