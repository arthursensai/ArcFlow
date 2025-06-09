import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock data for completed days (you'd replace this with your actual data)
  const completedDays = [
    new Date(2025, 5, 1),
    new Date(2025, 5, 2),
    new Date(2025, 5, 3),
    new Date(2025, 5, 4),
    new Date(2025, 5, 5),
    new Date(2025, 5, 6),
    new Date(2025, 5, 7),
    new Date(2025, 5, 9),
    new Date(2025, 5, 10),
    new Date(2025, 5, 11),
    new Date(2025, 5, 12),
    new Date(2025, 5, 13),
    new Date(2025, 5, 14),
    new Date(2025, 5, 16),
    new Date(2025, 5, 17),
    new Date(2025, 5, 18),
    new Date(2025, 5, 19),
    new Date(2025, 5, 20),
    new Date(2025, 5, 21),
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Function to check if a date is completed
  const isDateCompleted = (date) => {
    return completedDays.some(completedDate => 
      completedDate.toDateString() === date.toDateString()
    );
  };

  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date: prevMonthDay,
        isCurrentMonth: false
      });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const days = getDaysInMonth();
  const completedThisMonth = completedDays.filter(date => 
    date.getMonth() === currentDate.getMonth() && 
    date.getFullYear() === currentDate.getFullYear()
  ).length;

  return (
    <div className="bg-surface rounded-xl p-6 border border-gray-700 shadow-lg">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text mb-1">Calendar</h3>
        <p className="text-sm text-muted">Track your progress</p>
      </div>
      
      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-lg bg-surface border border-primary/20 text-text hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h2 className="text-xl font-semibold text-text">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button 
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-lg bg-surface border border-primary/20 text-text hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted py-2 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((dayObj, index) => {
          const { date, isCurrentMonth } = dayObj;
          const completed = isDateCompleted(date);
          const today = isToday(date);
          const selected = isSelected(date);
          
          let dayClasses = [
            "relative h-10 w-full rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer flex items-center justify-center"
          ];

          if (!isCurrentMonth) {
            dayClasses.push("text-muted/40 bg-surface/10 border-transparent");
          } else {
            dayClasses.push("text-text bg-surface/40 border-gray-700/50");
            
            if (completed) {
              dayClasses.push("bg-success/20 border-success/50 text-success hover:bg-success/30");
            }
            
            if (today) {
              dayClasses.push("bg-primary/20 border-primary text-primary font-bold");
            }
            
            if (completed && today) {
              dayClasses.push("bg-gradient-to-br from-success/25 to-primary/20 border-success text-success");
            }
            
            if (selected) {
              dayClasses.push("ring-2 ring-primary/60");
            }
            
            if (!completed && !today) {
              dayClasses.push("hover:bg-primary/10 hover:border-primary/40 hover:text-primary");
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={dayClasses.join(" ")}
              disabled={!isCurrentMonth}
            >
              <span className="relative z-10">{date.getDate()}</span>
              {completed && isCurrentMonth && (
                <div className="absolute inset-0 bg-success/10 rounded-lg pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Calendar Legend and Stats */}
      <div className="flex items-center justify-between text-xs border-t border-gray-700/50 pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success/20 border border-success/50 rounded"></div>
            <span className="text-muted">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/20 border border-primary rounded"></div>
            <span className="text-muted">Today</span>
          </div>
        </div>
        <div className="text-muted font-medium">
          <span className="text-success">{completedThisMonth}</span> days completed this month
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;