import Link from "next/link";
import { auth } from "@/auth";
import LoginLink from "./LoginLink";
import ProfileSettings from "./ProfileSettings";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex justify-between items-center p-4 border-b-2 bg-glass-week ">
      <Link
        href="/"
        className="text-[48px] font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.8)] transition-all duration-300"
      >
        Arc
        <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]">
          Flow
        </span>
      </Link>

      <nav className="flex justify-center items-center">
        {session && session?.user ? <ProfileSettings /> : <LoginLink />}
      </nav>
    </header>
  );
};

export default Navbar;
