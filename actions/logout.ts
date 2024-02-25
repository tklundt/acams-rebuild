"use server";

import { signOut } from "@/auth";


//This can be used instead if some server tasks 
// need to be done before logging the user out
export const logout = async () => {
    await signOut();
}