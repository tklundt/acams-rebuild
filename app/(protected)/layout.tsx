import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps{
    children: React.ReactNode;
};

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex pt-4 flex-col gap-y-10 items-center
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950 to-black">
            <Navbar />
            {children}
        </div>
    );
}
export default ProtectedLayout;