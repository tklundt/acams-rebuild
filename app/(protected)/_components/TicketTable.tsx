import TicketTableFormat from "./TicketTableFormat";
import { db } from "@/lib/db";

export default async function TicketTable({
    query,
  }: {
    query: string;
  }) {
    if(query === ""){
      const tickets = await db.ticket.findMany()
      if(!tickets){
        return (
          <div>
            <p className="bg-white text-red-500">
              🤔 There's nothing here!
            </p>
          </div>
        )
      }
      return (
        <TicketTableFormat tickets={tickets}/>
      )
    } else {
      const tickets = await db.ticket.findMany({
        where: {
          OR: [
            {
              subject: {
                contains: `%${query}%`,
                mode: 'insensitive'
              },
            },
            {
              description: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            },
            {
              adminNote: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            },
            {
              status: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            }
          ]
        },
        select: {
          ticketId: true,
          assetId: true,
          subject: true,
          description: true,
          adminNote: true,
          createDate: true,
          status: true
        }
      })
      if(!tickets){
        return (
          <div>
            <p className="bg-white text-red-500">
              🤔 There's nothing here!
            </p>
          </div>
        )
      }
      return (
        <TicketTableFormat tickets={tickets}/>
      )
    }
  }