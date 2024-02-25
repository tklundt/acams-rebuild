import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { getUserById } from "./data/user";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
    interface User {
      role: "ADMIN" | "USER"
    }
  }

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        async session({token, session}){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            if(token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if(session.user){
                session.user.name = token.name;
                // @ts-ignore:next-line
                session.user.email = token.email;
            }            

            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt" },
    ...authConfig,
});