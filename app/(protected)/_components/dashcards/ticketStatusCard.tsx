import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";

export const TicketStatusCard = () => {
    const ticketCountOpen = db.ticket.count({
        where: {
            status: 'Open'
        }
    });
    const ticketCountClosed = db.ticket.count({
        where: {
            status: 'Closed'
        }
    });
    return (
    <Card className="w-[180px] h-[180px] m-2">
        <CardHeader>
            <p className="text-2xl font-semibold text-center text-black">
                Tickets
            </p>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        <div className="flex flex-row">
                <div className="m-2 text-center text-red-700">
                    Open
                    <p>{ticketCountOpen}</p>
                 </div>
            </div>
            <div className="flex flex-row">
                <div className="m-2 text-center text-gray-500">
                    Closed
                    <p>{ticketCountClosed}</p>
                 </div>
            </div>
        </CardContent>
    </Card>
    );
}