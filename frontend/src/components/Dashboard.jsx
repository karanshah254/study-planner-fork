import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  Plus,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const [activeTimer, setActiveTimer] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const subjects = [
    { name: 'Mathematics', progress: 85, color: 'bg-purple-500', sessions: 12 },
    { name: 'Physics', progress: 72, color: 'bg-blue-500', sessions: 8 },
    { name: 'Chemistry', progress: 91, color: 'bg-teal-500', sessions: 15 },
    { name: 'Biology', progress: 67, color: 'bg-green-500', sessions: 6 }
  ];

  const todaysTasks = [
    { id: 1, task: 'Complete Calculus Assignment', priority: 'high', completed: false },
    { id: 2, task: 'Review Organic Chemistry Notes', priority: 'medium', completed: true },
    { id: 3, task: 'Physics Lab Report', priority: 'high', completed: false },
    { id: 4, task: 'Biology Chapter 7 Reading', priority: 'low', completed: false }
  ];

  const stats = {
    todayStudyTime: '4h 32m',
    weeklyGoal: 85,
    streak: 12,
    totalSessions: 47
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, Alex! 🌟
          </h1>
          <p className="text-gray-600">
            You have 3 tasks pending and 2 study sessions scheduled today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Study Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayStudyTime}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Goal</p>
                <p className="text-2xl font-bold text-gray-900">{stats.weeklyGoal}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.streak} days</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-lg">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Study Timer */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Timer</h3>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                    <div className="absolute inset-0 rounded-full border-t-8 border-purple-500 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">
                        {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center space-x-3">
                  <button
                    onClick={() => setActiveTimer(!activeTimer)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTimer 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-purple-500 hover:bg-purple-600 text-white'
                    }`}
                  >
                    {activeTimer ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {activeTimer ? 'Pause' : 'Start'}
                  </button>
                </div>
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
                <button className="text-purple-600 hover:text-purple-700">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                {todaysTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <button className="flex-shrink-0">
                      <CheckCircle className={`h-5 w-5 ${task.completed ? 'text-green-500' : 'text-gray-300'}`} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.task}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Subject Progress</h3>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{subject.name}</h4>
                          <p className="text-sm text-gray-500">{subject.sessions} sessions</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${subject.color} transition-all duration-500`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Recommendations */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">🧠 Smart Recommendations</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">
                    <strong>Best Study Time:</strong> Based on your patterns, you're most productive between 9 AM - 11 AM.
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">
                    <strong>Focus Area:</strong> Consider spending more time on Biology to improve your overall performance.
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">
                    <strong>Break Reminder:</strong> You've been studying for 45 minutes. Take a 10-minute break!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;