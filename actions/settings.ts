"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import bcrypt from "bcryptjs"

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if(!user){
        return {error: "Unauthorized"}
    }

    // @ts-ignore
    const dbUser = await getUserById(user.id);
    if(!dbUser){
        return { error: "Unauthorized"}
    }

    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email);

        if(existingUser && existingUser.id !== user.id){
            return { error: "Email already in use."}
        }
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password,
        );

        if (!passwordsMatch){
            return {error: "Password mismatch"}
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values,
        }
    })

    return { success: "Settings updated"}
}