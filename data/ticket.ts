import { db } from "@/lib/db";

export const getTicketById = async (ticketId: string) => {
    try {
        const ticket = await db.ticket.findUnique({
            where: {ticketId}
        })
        return ticket;
    } catch {
        return null;
    }
}