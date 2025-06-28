import React from 'react';
import { TrendingUp, Clock, Target, BookOpen, Award, Calendar } from 'lucide-react';

const Analytics = () => {
  const weeklyData = [
    { day: 'Mon', hours: 4.5, sessions: 3 },
    { day: 'Tue', hours: 3.2, sessions: 2 },
    { day: 'Wed', hours: 5.1, sessions: 4 },
    { day: 'Thu', hours: 2.8, sessions: 2 },
    { day: 'Fri', hours: 4.7, sessions: 3 },
    { day: 'Sat', hours: 6.2, sessions: 4 },
    { day: 'Sun', hours: 3.5, sessions: 2 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', efficiency: 89, timeSpent: 28, improvement: '+12%' },
    { subject: 'Physics', efficiency: 76, timeSpent: 22, improvement: '+8%' },
    { subject: 'Chemistry', efficiency: 94, timeSpent: 31, improvement: '+15%' },
    { subject: 'Biology', efficiency: 68, timeSpent: 19, improvement: '+5%' }
  ];

  const achievements = [
    { title: '7-Day Streak', description: 'Studied consistently for a week', icon: Award, color: 'text-yellow-500' },
    { title: 'Early Bird', description: 'Started 5 sessions before 9 AM', icon: Clock, color: 'text-blue-500' },
    { title: 'Subject Master', description: 'Completed Chemistry module', icon: BookOpen, color: 'text-green-500' },
    { title: 'Goal Crusher', description: 'Exceeded weekly study target', icon: Target, color: 'text-purple-500' }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Analytics</h2>
        <p className="text-gray-600">Track your study patterns and progress over time</p>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Study Hours</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Study Hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Sessions</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                <div 
                  className="absolute bottom-0 w-full bg-purple-500 transition-all duration-700 ease-out"
                  style={{ height: `${(day.hours / maxHours) * 100}%` }}
                ></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {day.sessions}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-900">{day.hours}h</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance</h3>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600 font-medium">{subject.improvement}</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Efficiency: {subject.efficiency}%</span>
                  <span>{subject.timeSpent}h this week</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${subject.efficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg bg-white ${achievement.color}`}>
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Insights */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">📊 Study Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Peak Performance</span>
            </div>
            <p className="text-sm opacity-90">You're most focused during 10-11 AM sessions with 94% efficiency rate.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Best Study Days</span>
            </div>
            <p className="text-sm opacity-90">Saturdays show highest productivity with average 6.2 hours per session.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5" />
              <span className="font-medium">Improvement Area</span>
            </div>
            <p className="text-sm opacity-90">Focus more on Biology - it's 15% behind your average performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;