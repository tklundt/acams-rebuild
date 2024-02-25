import {Header} from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label=""/>
            </CardHeader>
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive size-8"/>
                <p className="text-red-500 p-2 text-lg">An error occurred</p>
            </div>
            <CardFooter>
                <BackButton 
                    label="Back to login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card>
    )
}