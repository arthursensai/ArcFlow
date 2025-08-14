import Navbar from "@/components/Navbar";
import Clock from "@/components/Clock";
import StartTracking from "@/components/StartTracking";
import Quote from "@/components/Quote";
import { SessionProvider } from "next-auth/react";
import StoreSync from "@/components/StoreSync";
import { auth } from "@/auth";
import MainTitle from "@/components/MainTitle";

const page = async () => {
  const session = await auth();

  return (
    <main className="main-bg min-h-screen w-full flex flex-col">
      <SessionProvider>
        <StoreSync />
        <Navbar />
        <div className="flex-1 flex w-full flex-col items-center justify-center gap-8">
          {session ? (
            <MainTitle />
          ) : (
            ""
          )}
          <Clock />
          {session ? <StartTracking /> : ""}
        </div>
        <Quote />
      </SessionProvider>
    </main>
  );
};

export default page;
