import { useState, useEffect, useRef } from 'react';
import { Play, Pause, CirclePlay, RotateCcw, Settings } from 'lucide-react';
import axios from 'axios';

const mainUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const PomodoroTimer = () => {
  const [session, setSession] = useState('work'); // 'work' or 'break'
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workMinutes: 25,
    breakMinutes: 5,
    longBreakMinutes: 15,
    sessionsUntilLongBreak: 4
  });
  
  const intervalRef = useRef(null);

  const getTimerDuration = (sessionType) => {
    if (sessionType === 'work') return settings.workMinutes * 60;
    if (sessionType === 'longBreak') return settings.longBreakMinutes * 60;
    return settings.breakMinutes * 60;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio notification unavailable');
    }
  };

  // Function to update habit total minutes
  const updateHabitMinutes = async (minutesToAdd) => {
    try {
      const response = await axios.put(`${mainUrl}/profile/updateTotalMinutes`, {
        minutesToAdd: minutesToAdd
      });
      console.log('Habit updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update habit:', error.response?.data || error.message);
    }
  };

  const handleSessionEnd = () => {
    playNotificationSound();
    
    if (session === 'work') {
      // Update habit with completed work session minutes
      const completedSeconds = getTimerDuration('work') - timeLeft;
      const completedMinutes = completedSeconds / 60;
      if (completedMinutes >= 0.5) {
        updateHabitMinutes(completedMinutes);
      }
      
      setCompletedSessions(prev => {
        const newCount = prev + 1;
        const isLongBreak = newCount % settings.sessionsUntilLongBreak === 0;
        setSession(isLongBreak ? 'longBreak' : 'break');
        setTimeLeft(getTimerDuration(isLongBreak ? 'longBreak' : 'break'));
        return newCount;
      });
    } else {
      setSession('work');
      setTimeLeft(getTimerDuration('work'));
    }
    
    setIsRunning(false);
    
    if (Notification.permission === 'granted') {
      new Notification(`${session === 'work' ? 'Work' : 'Break'} session completed!`, {
        body: session === 'work' ? 'Time for a break!' : 'Time to focus!',
        icon: '🍅'
      });
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, session, settings.workMinutes]); // Added dependencies

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Effect to update timer when settings change
  useEffect(() => {
    // Only update if timer is not running or if the timer is at full duration (hasn't been started yet)
    if (!isRunning || timeLeft === getTimerDuration(session)) {
      setTimeLeft(getTimerDuration(session));
    }
  }, [settings, session]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTimeLeft(getTimerDuration(session));
  };

  const handleReset = () => {
    setIsRunning(false);
    setSession('work');
    setTimeLeft(getTimerDuration('work'));
    setCompletedSessions(0);
  };

  const switchSession = () => {
    // If switching away from a work session that was in progress, update habit minutes
    if (session === 'work' && timeLeft < getTimerDuration('work')) {
      const completedMinutes = Math.floor((getTimerDuration('work') - timeLeft) / 60);
      if (completedMinutes > 0) {
        updateHabitMinutes(completedMinutes);
      }
    }
    
    const newSession = session === 'work' ? 'break' : 'work';
    setSession(newSession);
    setTimeLeft(getTimerDuration(newSession));
    setIsRunning(false);
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    // The useEffect above will handle updating the timer duration
  };

  const getSessionInfo = () => {
    if (session === 'work') return { color: 'primary', label: '🎯 Focus Time', bg: 'bg-[#1FB6FF]', text: 'text-[#1FB6FF]', border: 'border-[#1FB6FF]' };
    if (session === 'longBreak') return { color: 'accent', label: '🌟 Long Break', bg: 'bg-[#00C2FF]', text: 'text-[#00C2FF]', border: 'border-[#00C2FF]' };
    return { color: 'success', label: '☕ Break Time', bg: 'bg-[#10B981]', text: 'text-[#10B981]', border: 'border-[#10B981]' };
  };

  const sessionInfo = getSessionInfo();
  const progress = ((getTimerDuration(session) - timeLeft) / getTimerDuration(session)) * 100;

  return (
    <div className="bg-[#0E0E12] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1C1C26] rounded-2xl border border-gray-700/50 flex flex-col justify-center items-center py-8 px-6 shadow-2xl max-w-md w-full">
        
        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1C1C26] rounded-2xl p-6 max-w-sm w-full mx-4 border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-[#E4E4E7]">Timer Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Work Minutes</label>
                  <input
                    type="number"
                    value={settings.workMinutes}
                    onChange={(e) => updateSettings({...settings, workMinutes: parseInt(e.target.value) || 25})}
                    className="w-full px-3 py-2 bg-[#0E0E12] border border-gray-600 rounded-lg text-[#E4E4E7] focus:border-[#1FB6FF] focus:outline-none"
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Break Minutes</label>
                  <input
                    type="number"
                    value={settings.breakMinutes}
                    onChange={(e) => updateSettings({...settings, breakMinutes: parseInt(e.target.value) || 5})}
                    className="w-full px-3 py-2 bg-[#0E0E12] border border-gray-600 rounded-lg text-[#E4E4E7] focus:border-[#1FB6FF] focus:outline-none"
                    min="1"
                    max="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Long Break Minutes</label>
                  <input
                    type="number"
                    value={settings.longBreakMinutes}
                    onChange={(e) => updateSettings({...settings, longBreakMinutes: parseInt(e.target.value) || 15})}
                    className="w-full px-3 py-2 bg-[#0E0E12] border border-gray-600 rounded-lg text-[#E4E4E7] focus:border-[#1FB6FF] focus:outline-none"
                    min="5"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">Sessions Until Long Break</label>
                  <input
                    type="number"
                    value={settings.sessionsUntilLongBreak}
                    onChange={(e) => updateSettings({...settings, sessionsUntilLongBreak: parseInt(e.target.value) || 4})}
                    className="w-full px-3 py-2 bg-[#0E0E12] border border-gray-600 rounded-lg text-[#E4E4E7] focus:border-[#1FB6FF] focus:outline-none"
                    min="2"
                    max="10"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-[#1FB6FF] text-white rounded-lg hover:bg-[#00C2FF] transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-600 text-[#E4E4E7] rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full animate-pulse ${sessionInfo.bg}`} />
              <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-gray-800/50 ${sessionInfo.text} border ${sessionInfo.border}/30`}>
                {sessionInfo.label}
              </span>
            </div>
            
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-600/50 transition-colors border border-gray-600/30"
            >
              <Settings size={16} className="text-[#9CA3AF]" />
            </button>
          </div>
          
          {completedSessions > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-[#9CA3AF] mb-4">
              <span>🏆</span>
              <span>Sessions: <span className="text-[#10B981] font-medium">{completedSessions}</span></span>
              {completedSessions % settings.sessionsUntilLongBreak === 0 && (
                <span className="text-[#00C2FF] font-medium">• Long break earned!</span>
              )}
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-full bg-gray-700/30 rounded-full h-1 mb-4">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ${sessionInfo.bg}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className="relative mb-8">
          <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 ${sessionInfo.bg}`} />
          <div className="relative bg-gray-800/30 rounded-3xl p-8 border border-gray-700/30 backdrop-blur-sm">
            <span className={`text-7xl md:text-8xl font-mono text-center block leading-none transition-colors duration-500 ${sessionInfo.text}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {!isRunning ? (
            <button 
              onClick={handleStart} 
              className="group relative p-4 rounded-2xl bg-[#1FB6FF]/10 border border-[#1FB6FF]/30 hover:bg-[#1FB6FF] hover:border-[#1FB6FF] hover:shadow-lg hover:shadow-[#1FB6FF]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] focus:ring-offset-2 focus:ring-offset-[#1C1C26]"
            >
              <Play size={28} className="text-[#1FB6FF] group-hover:text-white transition-colors" />
            </button>
          ) : (
            <button 
              onClick={handlePause} 
              className="group relative p-4 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 hover:bg-[#F97316] hover:border-[#F97316] hover:shadow-lg hover:shadow-[#F97316]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#1C1C26]"
            >
              <Pause size={28} className="text-[#F97316] group-hover:text-white transition-colors" />
            </button>
          )}
          
          {!isRunning && timeLeft < getTimerDuration(session) && (
            <button 
              onClick={handleResume} 
              className="group relative p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 hover:bg-[#10B981] hover:border-[#10B981] hover:shadow-lg hover:shadow-[#10B981]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-[#1C1C26]"
            >
              <CirclePlay size={28} className="text-[#10B981] group-hover:text-white transition-colors" />
            </button>
          )}
          
          <button 
            onClick={handleRestart} 
            className="group relative p-4 rounded-2xl bg-[#9CA3AF]/10 border border-[#9CA3AF]/30 hover:bg-[#9CA3AF] hover:border-[#9CA3AF] hover:shadow-lg hover:shadow-[#9CA3AF]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9CA3AF] focus:ring-offset-2 focus:ring-offset-[#1C1C26]"
          >
            <RotateCcw size={28} className="text-[#9CA3AF] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Session Controls */}
        <div className="flex gap-3 w-full">
          <button
            onClick={switchSession}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:bg-gray-700/40 hover:border-gray-600/50 transition-all duration-300 text-sm text-[#9CA3AF] hover:text-[#E4E4E7]"
          >
            <span>Switch to {session === 'work' ? '☕ Break' : '🎯 Focus'}</span>
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 hover:bg-[#EF4444]/20 hover:border-[#EF4444]/50 transition-all duration-300 text-sm text-[#EF4444] hover:text-[#EF4444]"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;