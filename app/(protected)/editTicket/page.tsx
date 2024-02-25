import { db } from "@/lib/db";
import { EditTicketForm } from "../_components/EditTicketForm";
import { currentUser } from "@/lib/auth";

export default async function EditTicketPage({
    params,
    searchParams,
}: {
    params: { slug: string};
    searchParams?: { [key:string]: string | undefined};
}) {
    const user = await currentUser();
    if(user?.role==='USER'){
        return (
            <div>
                <p className="text-2xl shadow-md bg-white text-red-700 p-4 rounded-lg">⚠️Access denied</p>
            </div>
        )
    }
    const idToQuery = searchParams?.t;
    if(!idToQuery){
        return (
            <div><h1 className="text-white">⚠️ Missing ID ⚠️</h1></div>
        )
    }

    const ticket = await db.ticket.findUnique({
        where: {
            ticketId: idToQuery,
        },
     })
    if(!ticket){
        return (
            <div><h1 className="text-white w-[800px]">⚠️ Ticket Not Found ⚠️</h1></div>
        )
    } 
    return(
        <EditTicketForm  
            urlId={idToQuery}
            assetId={ticket.assetId}
            subject={ticket.subject}
            description={ticket.description}
            adminNote={ticket.adminNote}
            createDate={ticket.createDate}
            status={ticket.status}
        />
    )
}