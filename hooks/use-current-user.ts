import { useSession } from "next-auth/react";

//A shortcut to shorten the session.data.user object string
//Use this for CLIENT side (its a hook, duh)
export const useCurrentUser = () => {
    const session = useSession();
    return session.data?.user;
}