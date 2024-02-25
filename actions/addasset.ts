"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { AssetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addasset = async (values: z.infer<typeof AssetSchema>) => {
    const validatedFields = AssetSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid fields" };
    }

    const {type, status, usedBy, name, description, condition } = validatedFields.data;
    
    await db.asset.create({
        data: {
            type,
            status,
            usedBy,
            name,
            description,
            condition
        },
    });
    
    revalidatePath('/assets');
    redirect('/assets');
}

