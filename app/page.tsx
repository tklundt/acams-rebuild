import {Button} from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";



const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950 to-black">
      <div className="space-y-6 text-center w-full p-4 bg-black rounded-xl">
        <h1 className={cn(
          "text-6xl font-semibold text-amber-500 drop-shadow-md",
          font.className,
          )}>
            ACAMS System
        </h1>
        <p className="text-white text-lg">
          Awesome Company Asset Management Solution
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg" className="w-[400px]">
              <p className="text-lg">
                Log In
              </p>
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
