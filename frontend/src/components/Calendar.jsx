import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, BookOpen } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const studySessions = {
    '2024-01-15': [
      { time: '09:00', subject: 'Mathematics', duration: '2h', type: 'study' },
      { time: '14:00', subject: 'Physics', duration: '1h 30m', type: 'review' }
    ],
    '2024-01-16': [
      { time: '10:00', subject: 'Chemistry', duration: '1h 45m', type: 'study' }
    ],
    '2024-01-18': [
      { time: '11:00', subject: 'Biology', duration: '2h 15m', type: 'lab' },
      { time: '15:30', subject: 'Mathematics', duration: '1h', type: 'practice' }
    ]
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'study': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-teal-100 text-teal-800';
      case 'practice': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Study Calendar</h2>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Session
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{monthYear}</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map((day, index) => {
          const dateKey = formatDateKey(day);
          const sessions = studySessions[dateKey] || [];
          const hasEvents = sessions.length > 0;

          return (
            <div
              key={index}
              onClick={() => setSelectedDate(selectedDate === dateKey ? null : dateKey)}
              className={`
                relative p-3 min-h-[80px] border rounded-lg cursor-pointer transition-colors
                ${isCurrentMonth(day) ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
                ${isToday(day) ? 'ring-2 ring-purple-500' : 'border-gray-200'}
                ${selectedDate === dateKey ? 'bg-purple-50 border-purple-300' : ''}
              `}
            >
              <div className="text-sm font-medium">
                {day.getDate()}
              </div>
              {hasEvents && (
                <div className="mt-1 space-y-1">
                  {sessions.slice(0, 2).map((session, idx) => (
                    <div
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800 truncate"
                    >
                      {session.time} {session.subject}
                    </div>
                  ))}
                  {sessions.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{sessions.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && studySessions[selectedDate] && (
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Sessions for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          <div className="space-y-3">
            {studySessions[selectedDate].map((session, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">{session.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-gray-900">{session.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{session.duration}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                    {session.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;