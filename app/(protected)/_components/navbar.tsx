"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@prisma/client";

export const Navbar = () => {
    const pathname = usePathname();
    const user = useCurrentUser();
    return (
        <nav className="bg-secondary flex justify-start items-center p-2 rounded-xl w-[900px] shadow-sm">
            <div className="pr-8">
                <UserButton />
            </div>
            
            <div className="flex gap-x-2">

                {/* Dashboard*/}
                <Button 
                    asChild
                    variant={pathname==="/dashboard" ? "default" : "outline"}    
                >
                    <Link href="/dashboard">Dashboard</Link>
                </Button>

                {/* Assets*/}
                <Button 
                    asChild
                    variant={pathname==="/assets" ? "default" : "outline"}    
                >
                    <Link href="/assets">Assets</Link>
                </Button>



                {/* Role Gate the developer buttons to admin role */}
                {user?.role===UserRole.ADMIN && (
                <>
                    {/* Tickets*/}
                    <Button 
                        asChild
                        variant={pathname==="/tickets" ? "default" : "outline"}    
                    >
                        <Link href="/tickets">Tickets</Link>
                    </Button>
                </>
                )}
                
                {/* Settings page - change username, email, password */}
                <Button 
                    asChild
                    variant={pathname==="/settings" ? "default" : "outline"}    
                >
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
        </nav>
    );
};