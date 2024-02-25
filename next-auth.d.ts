import { UserRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
}

//Add custom fields to the session token based off these definitions
declare module "next-auth" {
    interface Session{
        user: ExtendedUser
    }
}