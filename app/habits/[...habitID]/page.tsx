import prisma from "@/lib/prisma";

interface HabitPageProps {
  params: Promise<{
    habitID: string[];
  }>;
}

const page = async ({ params }: HabitPageProps) => {
  const resolvedParams = await params;
  
  if (!resolvedParams.habitID?.length) {
    return <div>No habit ID provided</div>;
  }

  const habitId = resolvedParams.habitID[0];
  const habit = await prisma.habit.findUnique({ where: { id: habitId } });

  return (
    <div>
      <h1>Habit ID: {habitId}</h1>
      <h1>{habit?.title}</h1>
      <p>{habit?.description}</p>
    </div>
  );
};

export default page;