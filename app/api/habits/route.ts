import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const habits = await prisma.habit.findMany({
      where: { userID: session.user.id },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true
      }
    });
    return Response.json(habits);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
