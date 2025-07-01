import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <div className="text-[140px] font-mono text-center border-4 border-primary/30 w-min rounded-xl px-8 py-4 bg-surface/50 backdrop-blur-sm shadow-xl shadow-glow/10 text-text hover:border-primary/50 hover:shadow-glow/20 transition-all duration-300">
            <span className="hover:text-primary transition-colors duration-300">{hours}</span>
            <span className="animate-blink text-glow drop-shadow-lg">:</span>
            <span className="hover:text-primary transition-colors duration-300">{minutes}</span>
        </div>
    );
};

export default Clock;