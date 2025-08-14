"use client";

import userStore from "@/stores/userStore";

const MainTitle = () => {
  const name = userStore((state) => state.name);

  return (
    <h2 className="text-4xl font-bold text-white animate-fade-in-scale">
      Welcome Back, {name}
    </h2>
  );
};

export default MainTitle;