import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";

export const AssetsAndTicketsCard = () => {
    const assetCount = db.asset.count();
    const ticketCount = db.ticket.count();


    return (
    <Card className="w-[180px] h-[180px] m-2">
        <CardHeader>
            <p className="text-2xl font-semibold text-center text-black">
                DB Status
            </p>
        </CardHeader>
        <CardContent className="flex">
            <div className="flex flex-row">
                <div className="m-2 text-center">
                    Assets
                    <p>{assetCount}</p>
                 </div>
            </div>
            <div className="flex flex-row">
                <div className="m-2 text-center">
                    Tickets
                    <p>{ticketCount}</p>
                 </div>
            </div>
        </CardContent>
    </Card>
    );
}