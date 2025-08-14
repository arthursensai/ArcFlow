"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/stores/userStore";

const StoreSync = () => {
  const { data: session } = useSession();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser(
        session.user.name as string,
        session.user.email as string,
        session.user.image as string
      );
    }
  }, [session, setUser]);

  return null;
};

export default StoreSync;
