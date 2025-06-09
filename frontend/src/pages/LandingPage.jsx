import { Calendar, Flame, Crosshair, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <section className="w-full h-screen flex flex-col justify-center items-center gap-8 px-4">
                {/* Logo with subtle glow effect */}
                <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
                    <span className="text-cyan-400 drop-shadow-lg">A</span>rc<span className="text-cyan-400 drop-shadow-lg">F</span>low
                </h1>
                
                {/* Improved tagline with better spacing */}
                <p className="text-xl md:text-2xl text-center max-w-4xl text-slate-300 leading-relaxed">
                    Track daily habits, visualize your progress, and build lasting routines with streak-based motivation.
                </p>
                
                {/* Enhanced CTA button */}
                <Link className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xl md:text-2xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border-0" to='/login'>
                    Start Now!
                </Link>
                
                {/* Improved feature cards */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-8 flex flex-col justify-center items-center gap-3 transition-all duration-300 hover:scale-105 hover:bg-slate-700/50 hover:border-cyan-500/50 cursor-pointer group w-48">
                        <Calendar size={32} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <h2 className="font-bold text-lg">Calendar</h2>
                        <p className="text-slate-300 text-center text-sm">See your consistency patterns at a glance</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-8 flex flex-col justify-center items-center gap-3 transition-all duration-300 hover:scale-105 hover:bg-slate-700/50 hover:border-cyan-500/50 cursor-pointer group w-48">
                        <Flame size={32} className="text-orange-400 group-hover:text-orange-300 transition-colors" />
                        <h2 className="font-bold text-lg">Streak Tracker</h2>
                        <p className="text-slate-300 text-center text-sm">Gamify your progress with streak counters and rewards</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-8 flex flex-col justify-center items-center gap-3 transition-all duration-300 hover:scale-105 hover:bg-slate-700/50 hover:border-cyan-500/50 cursor-pointer group w-48">
                        <Crosshair size={32} className="text-green-400 group-hover:text-green-300 transition-colors" />
                        <h2 className="font-bold text-lg">Focus Mode</h2>
                        <p className="text-slate-300 text-center text-sm">Block distractions during habit-building time</p>
                    </div>
                </div>
                
                {/* Enhanced social media section */}
                <div className="flex flex-col items-center gap-3">
                    <h3 className="text-sm font-semibold text-slate-300">Follow Us</h3>
                    <div className="flex gap-4">
                        <div className="p-2 bg-slate-800/50 rounded-full border border-slate-700 hover:border-pink-500/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
                            <Instagram size={20} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                        </div>
                        <div className="p-2 bg-slate-800/50 rounded-full border border-slate-700 hover:border-purple-500/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
                            <Github size={20} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;