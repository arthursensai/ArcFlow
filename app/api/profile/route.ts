import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });
        return Response.json({ user }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }

}

export async function POST(request: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { newName } = await request.json();
    if (!newName) {
        return Response.json({ error: "No valid data" }, { status: 400 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { name: newName }
        });
        return Response.json({ user: updatedUser }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
