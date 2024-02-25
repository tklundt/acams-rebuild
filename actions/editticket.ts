"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { TicketSchema  } from "@/schemas";
import { getTicketById } from "@/data/ticket";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//This is something being submitted to the database with an already populated form

export const editticket = async (values: z.infer<typeof TicketSchema>, urlId: String) => {

    if(!urlId){
        return { error: "Missing URL ticket identifier"}
    }

    // @ts-ignore:next-line
    const dbTicket = await getTicketById(urlId);

    if(!dbTicket){
        return { error: "Invalid ticket ID"}
    }

    await db.ticket.update({
        where: {ticketId: dbTicket.ticketId},
        data: {
            adminNote: values.adminNote,
            status: values.status,
        },
    })

    revalidatePath('/tickets');
    redirect('/tickets');
}