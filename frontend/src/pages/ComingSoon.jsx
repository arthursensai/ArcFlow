import { Instagram, Mail, Github, Heart, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date("2025-08-01T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 justify-center items-center">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-900 font-bold text-2xl md:text-3xl w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300">
            {String(item.value).padStart(2, "0")}
          </div>
          <span className="text-gray-400 text-sm mt-2 font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const ComingSoon = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-cyan-400/5 to-transparent rounded-full blur-2xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="logo-text text-shadow-logo text-shadow-white absolute opacity-5 select-none animate-pulse max-sm:text-7xl">
            <span className="text-primary text-shadow-logo text-shadow-primary">
              A
            </span>
            rc
            <span className="text-primary text-shadow-logo text-shadow-primary">
              F
            </span>
            low
          </h1>
        </div>

        {/* Main content */}
        <div className="text-center space-y-8 sm:space-y-10 md:space-y-12 z-20 relative">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" />
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">
                Coming Soon
              </span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight px-4">
              Something Amazing
              <br />
              is on the Way
            </h2>

            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed px-4">
              We're crafting an extraordinary experience that will revolutionize
              how you think about flow. Get ready to be amazed.
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 px-4">
              Launching In
            </h3>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6 z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© 2025 ArcFlow — All rights reserved.</span>
            <span className="hidden md:inline">Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="hidden md:inline">by Arthur</span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Mail, href: "#", label: "Email" },
              { Icon: Github, href: "#", label: "GitHub" },
            // eslint-disable-next-line no-unused-vars
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-cyan-400/10"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
