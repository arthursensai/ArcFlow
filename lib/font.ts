import localFont from "next/font/local";

export const orbitron = localFont({
  src: [
    {
      path: "../public/fonts/Orbitron-Black.ttf",
      weight: '900',
      style: 'normal'
    },
    {
      path: "../public/fonts/Orbitron-Bold.ttf",
      weight: '700',
      style: 'normal'
    },
    {
      path: "../public/fonts/Orbitron-Medium.ttf",
      weight: '500',
      style: 'normal'
    },
    {
      path: "../public/fonts/Orbitron-Regular.ttf",
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-orbitron'
});