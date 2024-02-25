import { AssetConditionCard } from "../_components/dashcards/assetConditionsCard";
import { AssetsAndTicketsCard } from "../_components/dashcards/assetsAndTickets";
import { UsersAndRoleCard } from "../_components/dashcards/usersAndRole";
import { TicketStatusCard } from "../_components/dashcards/ticketStatusCard";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

const DashboardPage = async () => {
    const user = await currentUser();
    return ( 
        <div>
            <div className="flex justify-center items-center">
            <AssetsAndTicketsCard/>
            <UsersAndRoleCard/>
            <AssetConditionCard/>
            </div>
            
            {user?.role===UserRole.ADMIN && (
                <>
                    <div className="flex justify-center items-center">
                    <TicketStatusCard />
                    </div>
                </> 
            )}
        </div> 
    )
}

export default DashboardPage;