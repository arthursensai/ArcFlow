import { Link } from 'react-router-dom';
import { Calendar, Flame, Crosshair, Instagram, Github, ChevronDown } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0E0E12' }}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#1FB6FF', opacity: 0.1 }}></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#60EFFF', opacity: 0.1, animationDelay: '2s' }}></div>
            </div>
            
            <section className="relative w-full min-h-screen flex flex-col justify-center items-center gap-12 px-4 py-16">
                {/* Logo with enhanced glow effect */}
                <div className="text-center">
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-4 relative">
                        <span className="drop-shadow-2xl relative">
                            <span style={{ color: '#1FB6FF', textShadow: '0 0 30px #60EFFF' }}>A</span>
                            <span style={{ color: '#E4E4E7' }}>rc</span>
                            <span style={{ color: '#1FB6FF', textShadow: '0 0 30px #60EFFF' }}>F</span>
                            <span style={{ color: '#E4E4E7' }}>low</span>
                        </span>
                    </h1>
                    
                    {/* Pulsing underline */}
                    <div className="w-32 h-1 mx-auto rounded-full animate-pulse" style={{ backgroundColor: '#00C2FF', boxShadow: '0 0 20px #60EFFF' }}></div>
                </div>
                
                {/* Enhanced tagline with animated typing cursor */}
                <div className="text-center max-w-4xl">
                    <p className="text-xl md:text-3xl leading-relaxed mb-2" style={{ color: '#E4E4E7' }}>
                        Track daily habits, visualize your progress, and build lasting routines
                    </p>
                    <p className="text-lg md:text-xl" style={{ color: '#9CA3AF' }}>
                        with streak-based motivation<span className="animate-blink text-accent ml-1">|</span>
                    </p>
                </div>
                
                {/* Premium CTA button with enhanced effects */}
                <div className="relative group">
                    <div className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" style={{ background: 'linear-gradient(45deg, #1FB6FF, #00C2FF, #60EFFF)' }}></div>
                    <button 
                        className="relative flex items-center gap-3 text-white text-xl md:text-2xl font-bold py-5 px-10 rounded-3xl transform hover:scale-105 transition-all duration-300 border-0 cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #1FB6FF, #00C2FF)' }}
                        onClick={() => window.location.href = '/login'}
                    >
                        Start Your Journey
                        <ChevronDown size={24} className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                
                {/* Enhanced feature cards with custom colors */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-8">
                    <div 
                        className="backdrop-blur-sm border rounded-2xl px-8 py-10 flex flex-col justify-center items-center gap-4 transition-all duration-500 hover:scale-105 cursor-pointer group w-64 relative overflow-hidden"
                        style={{ 
                            backgroundColor: '#1C1C26', 
                            borderColor: '#1C1C26',
                            boxShadow: '0 4px 20px rgba(31, 182, 255, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#1FB6FF';
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(31, 182, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#1C1C26';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(31, 182, 255, 0.1)';
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, #1FB6FF, #00C2FF)' }}></div>
                        <Calendar size={40} style={{ color: '#1FB6FF' }} className="group-hover:scale-110 transition-transform duration-300" />
                        <h2 className="font-bold text-xl" style={{ color: '#E4E4E7' }}>Smart Calendar</h2>
                        <p className="text-center text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                            Visualize your consistency patterns with intuitive calendar views and progress insights
                        </p>
                    </div>

                    <div 
                        className="backdrop-blur-sm border rounded-2xl px-8 py-10 flex flex-col justify-center items-center gap-4 transition-all duration-500 hover:scale-105 cursor-pointer group w-64 relative overflow-hidden"
                        style={{ 
                            backgroundColor: '#1C1C26', 
                            borderColor: '#1C1C26',
                            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#F97316';
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(249, 115, 22, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#1C1C26';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(249, 115, 22, 0.1)';
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#F97316' }}></div>
                        <Flame size={40} style={{ color: '#F97316' }} className="group-hover:scale-110 transition-transform duration-300" />
                        <h2 className="font-bold text-xl" style={{ color: '#E4E4E7' }}>Streak Power</h2>
                        <p className="text-center text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                            Gamify your habits with powerful streak tracking, rewards, and milestone celebrations
                        </p>
                    </div>

                    <div 
                        className="backdrop-blur-sm border rounded-2xl px-8 py-10 flex flex-col justify-center items-center gap-4 transition-all duration-500 hover:scale-105 cursor-pointer group w-64 relative overflow-hidden"
                        style={{ 
                            backgroundColor: '#1C1C26', 
                            borderColor: '#1C1C26',
                            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#10B981';
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(16, 185, 129, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#1C1C26';
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(16, 185, 129, 0.1)';
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#10B981' }}></div>
                        <Crosshair size={40} style={{ color: '#10B981' }} className="group-hover:scale-110 transition-transform duration-300" />
                        <h2 className="font-bold text-xl" style={{ color: '#E4E4E7' }}>Deep Focus</h2>
                        <p className="text-center text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                            Eliminate distractions with focus mode and dedicated habit-building sessions
                        </p>
                    </div>
                </div>
                
                {/* Enhanced social media section */}
                <div className="flex flex-col items-center gap-4 mt-12">
                    <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#9CA3AF' }}>Connect With Us</h3>
                    <div className="flex gap-4">
                        <div 
                            className="p-3 rounded-full border transition-all duration-300 cursor-pointer group relative overflow-hidden"
                            style={{ 
                                backgroundColor: '#1C1C26', 
                                borderColor: '#1C1C26' 
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#F97316';
                                e.currentTarget.style.backgroundColor = '#1C1C26';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#1C1C26';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <Link to='https://www.instagram.com/arthur_sensai'><Instagram si    ze={22} style={{ color: '#F97316' }} className="group-hover:scale-110 transition-transform duration-300" /></Link>
                        </div>
                        <div 
                            className="p-3 rounded-full border transition-all duration-300 cursor-pointer group relative overflow-hidden"
                            style={{ 
                                backgroundColor: '#1C1C26', 
                                borderColor: '#1C1C26' 
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#1FB6FF';
                                e.currentTarget.style.backgroundColor = '#1C1C26';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(31, 182, 255, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#1C1C26';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <Link to='https://github.com/arthursensai'><Github size={22} style={{ color: '#1FB6FF' }} className="group-hover:scale-110 transition-transform duration-300" /></Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown size={24} style={{ color: '#9CA3AF' }} />
                </div>
            </section>

            <style jsx>{`
                @keyframes blink {
                    0% { opacity: 1; }
                    45% { opacity: 1; }
                    50% { opacity: 0; }
                    95% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-blink {
                    animation: blink 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;