import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Plus, Clock, BookOpen, Edit, Trash2 } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sessions, setSessions] = useState({
    '2024-01-15': [
      { id: 1, time: '09:00', subject: 'Mathematics', duration: '2h', type: 'study' },
      { id: 2, time: '14:00', subject: 'Physics', duration: '1h 30m', type: 'review' }
    ],
    '2024-01-16': [
      { id: 3, time: '10:00', subject: 'Chemistry', duration: '1h 45m', type: 'study' }
    ],
    '2024-01-18': [
      { id: 4, time: '11:00', subject: 'Biology', duration: '2h 15m', type: 'lab' },
      { id: 5, time: '15:30', subject: 'Mathematics', duration: '1h', type: 'practice' }
    ]
  });

  const [newSession, setNewSession] = useState({
    time: '',
    subject: '',
    duration: '',
    type: 'study'
  });

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
      case 'study': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'lab': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300';
      case 'practice': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    const sessionId = Date.now();
    const newSessionData = {
      id: sessionId,
      ...newSession
    };

    setSessions(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newSessionData]
    }));

    setNewSession({ time: '', subject: '', duration: '', type: 'study' });
    setShowAddModal(false);
    toast.success('Session Added');
  };

  const handleDeleteSession = (sessionId) => {
    setSessions(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(date => {
        updated[date] = updated[date].filter(session => session.id !== sessionId);
        if (updated[date].length === 0) {
          delete updated[date];
        }
      });
      return updated;
    });
    toast.success('Session Deleted');
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
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Calendar</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Session
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{monthYear}</h3>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-6">
          {days.map((day, index) => {
            const dateKey = formatDateKey(day);
            const daySessions = sessions[dateKey] || [];
            const hasEvents = daySessions.length > 0;

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(selectedDate === dateKey ? null : dateKey)}
                className={`
                  relative p-3 min-h-[80px] border rounded-lg cursor-pointer transition-colors
                  ${isCurrentMonth(day) ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-gray-50 dark:bg-gray-900 text-gray-400'}
                  ${isToday(day) ? 'ring-2 ring-purple-500' : 'border-gray-200 dark:border-gray-600'}
                  ${selectedDate === dateKey ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300' : ''}
                `}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {day.getDate()}
                </div>
                {hasEvents && (
                  <div className="mt-1 space-y-1">
                    {daySessions.slice(0, 2).map((session, idx) => (
                      <div
                        key={idx}
                        className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 truncate"
                      >
                        {session.time} {session.subject}
                      </div>
                    ))}
                    {daySessions.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{daySessions.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedDate && sessions[selectedDate] && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sessions for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <div className="space-y-3">
              {sessions[selectedDate].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">{session.subject}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{session.duration}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                        {session.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteSession(session.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Study Session</h3>
            <form onSubmit={handleAddSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={newSession.subject}
                  onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter subject"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                <input
                  type="text"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 1h 30m"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                <select
                  value={newSession.type}
                  onChange={(e) => setNewSession({...newSession, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="study">Study</option>
                  <option value="review">Review</option>
                  <option value="lab">Lab</option>
                  <option value="practice">Practice</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;