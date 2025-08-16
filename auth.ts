import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Spotify from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Importance } from "@prisma/client";
import defaultHabits from "@/lib/defaultHabits";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  return {
    adapter: PrismaAdapter(prisma),
    providers: [
      Google,
      GitHub,
      Spotify({
        authorization:
          "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-read-playback-state,user-modify-playback-state",
      }),
    ],
    events: {
      createUser: async ({ user }) => {
        if (!user.id) return;
        await prisma.$transaction(
          defaultHabits.map((habit) =>
            prisma.habit.create({
              data: {
                user: { connect: { id: user.id } },
                title: habit.title,
                description: habit.description,
                todos: {
                  create: habit.todos.map((todo) => ({
                    user: { connect: { id: user.id } },
                    text: todo.text,
                    importance: todo.importance as Importance,
                  })),
                },
              },
            })
          )
        );
      },
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.name = token.name as string;
          session.user.email = token.email as string;
          session.user.image = token.image as string;
        }
        return session;
      },
      async signIn({ user, account, profile }) {
        return true;
      },
    },
    session: {
      strategy: "jwt"
    },
  };
});
