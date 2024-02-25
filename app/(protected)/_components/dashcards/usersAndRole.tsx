import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const UsersAndRoleCard = () => {
    const userCount = db.user.count({
        where: {
            role: UserRole.USER
        }
    });
    const adminCount = db.user.count({
        where: {
            role: UserRole.ADMIN
        }
    });
    //const ticketCount = db.asset.count(); TODO


    return (
    <Card className="w-[180px] h-[180px] m-2">
        <CardHeader>
            <p className="text-2xl font-semibold text-center text-black">
                Accounts
            </p>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        <div className="flex flex-row">
                <div className="m-2 text-center">
                    Users
                    <p>{userCount}</p>
                 </div>
            </div>
            <div className="flex flex-row">
                <div className="m-2 text-center">
                    Admins
                    <p>{adminCount}</p>
                 </div>
            </div>
        </CardContent>
    </Card>
    );
}