import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-3xl font-semibold -mb-6 ",
                font.className,
            )}>
                ACAMS System
            </h1>
            <p className="text-muted-foreground text-md pt-4">
                {label}
            </p>
        </div>
    );
}