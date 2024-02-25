"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { TicketSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addticket = async (values: z.infer<typeof TicketSchema>) => {
    const validatedFields = TicketSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid fields" };
    }

    const {assetId, subject, description } = validatedFields.data;
    
    await db.ticket.create({
        data: {
            assetId,
            subject,
            description,
        },
    });
    
    revalidatePath('/tickets');
    redirect('/assets');
}

