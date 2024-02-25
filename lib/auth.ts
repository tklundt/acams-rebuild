import { auth } from "@/auth";

//Shortcut for session object string
//Use this with SERVER
export const currentUser = async () => {
    const session = await auth();

    return session?.user;
}

export const currentRole = async () => {
    const session = await auth();

    return session?.user.role;
}