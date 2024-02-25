import { useSession } from "next-auth/react";

//Client side get current role
export const useCurrentRole = () => {
    const session = useSession();

    return session.data?.user?.role;
}