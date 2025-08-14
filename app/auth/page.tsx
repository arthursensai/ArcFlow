import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";
import Image from "next/image";

const page = async() => {
  const session = await auth();

  if(session) redirect("/");

  return (
    <div className="bg-muted main-bg flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image src="/logo.png" alt="ArcFlow logo" width={20} height={20}/>
          </div>
          ArcFlow.
        </a>
        <LoginForm />
      </div>
    </div>
  );
}

export default page;