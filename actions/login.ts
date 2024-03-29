"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid fields" };
    }

    const {email, password} = validatedFields.data;

    //If we want to use email verification
    // const existingUser = await getUserByEmail(email);
    // if(!existingUser || !existingUser.email || !existingUser.password){
    //     return {error: "Invalid credentials"}
    // }

    try {
        await signIn("credentials", {
            email, 
            password, 
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error: "Invalid credentials"}
                default:
                    return {error: "Something went wrong"}
            }
        }
        throw error;
    }
}