import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Compass, ChevronDown } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0E0E12' }}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#EF4444', opacity: 0.1 }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#1FB6FF', opacity: 0.1, animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#60EFFF', opacity: 0.08, animationDelay: '4s' }}></div>
            </div>
            
            <section className="relative w-full min-h-screen flex flex-col justify-center items-center gap-12 px-4 py-16">
                {/* 404 with enhanced glow effect */}
                <div className="text-center">
                    <h1 className="text-8xl md:text-9xl font-bold tracking-tight mb-4 relative">
                        <span className="drop-shadow-2xl relative">
                            <span style={{ color: '#EF4444', textShadow: '0 0 40px #EF4444' }}>4</span>
                            <span style={{ color: '#1FB6FF', textShadow: '0 0 30px #60EFFF' }}>0</span>
                            <span style={{ color: '#EF4444', textShadow: '0 0 40px #EF4444' }}>4</span>
                        </span>
                    </h1>
                    
                    {/* Pulsing underline with error color */}
                    <div className="w-40 h-1 mx-auto rounded-full animate-pulse" style={{ backgroundColor: '#EF4444', boxShadow: '0 0 20px #EF4444' }}></div>
                </div>
                
                {/* Enhanced tagline with animated typing cursor */}
                <div className="text-center max-w-4xl">
                    <p className="text-2xl md:text-4xl font-bold leading-relaxed mb-4" style={{ color: '#E4E4E7' }}>
                        Page Not Found
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed mb-2" style={{ color: '#9CA3AF' }}>
                        Looks like this habit hasn't been tracked yet
                    </p>
                    <p className="text-base md:text-lg" style={{ color: '#9CA3AF' }}>
                        Let's get you back on track<span className="animate-blink text-accent ml-1">|</span>
                    </p>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    {/* Primary CTA - Go Home */}
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" style={{ background: 'linear-gradient(45deg, #1FB6FF, #00C2FF, #60EFFF)' }}></div>
                        <Link 
                            to="/"
                            className="relative flex items-center gap-3 text-white text-lg md:text-xl font-bold py-4 px-8 rounded-3xl transform hover:scale-105 transition-all duration-300 border-0 cursor-pointer no-underline"
                            style={{ background: 'linear-gradient(135deg, #1FB6FF, #00C2FF)' }}
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                    </div>
                    
                    {/* Secondary CTA - Go Back */}
                    <div className="relative group">
                        <button 
                            className="relative flex items-center gap-3 text-white text-lg md:text-xl font-semibold py-4 px-8 rounded-3xl transform hover:scale-105 transition-all duration-300 border cursor-pointer"
                            style={{ 
                                backgroundColor: 'transparent',
                                borderColor: '#1C1C26'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#1FB6FF';
                                e.currentTarget.style.backgroundColor = '#1C1C26';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(31, 182, 255, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#1C1C26';
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </div>
                
                {/* Enhanced suggestion cards */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-12">
                    <div 
                        className="backdrop-blur-sm border rounded-2xl px-8 py-8 flex flex-col justify-center items-center gap-4 transition-all duration-500 hover:scale-105 cursor-pointer group w-64 relative overflow-hidden"
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
                        <Search size={36} style={{ color: '#1FB6FF' }} className="group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="font-bold text-lg" style={{ color: '#E4E4E7' }}>Search</h3>
                        <p className="text-center text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                            Find what you're looking for with our search feature
                        </p>
                    </div>

                    <div 
                        className="backdrop-blur-sm border rounded-2xl px-8 py-8 flex flex-col justify-center items-center gap-4 transition-all duration-500 hover:scale-105 cursor-pointer group w-64 relative overflow-hidden"
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
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.1)';
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#10B981' }}></div>
                        <Compass size={36} style={{ color: '#10B981' }} className="group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="font-bold text-lg" style={{ color: '#E4E4E7' }}>Explore</h3>
                        <p className="text-center text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                            Discover new habits and tracking features to explore
                        </p>
                    </div>
                </div>
                
                {/* Error code information */}
                <div className="text-center mt-8 opacity-60">
                    <p className="text-sm font-mono" style={{ color: '#9CA3AF' }}>
                        ERROR_CODE: HABIT_NOT_FOUND | STATUS: 404
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
                    <ChevronDown size={24} style={{ color: '#9CA3AF' }} />
                </div>
            </section>

            {/* Custom styles */}
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

export default NotFoundPage;