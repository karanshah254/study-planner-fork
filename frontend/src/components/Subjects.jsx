import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  Target,
  TrendingUp,
  Award
} from 'lucide-react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Advanced Mathematics',
      color: 'bg-purple-500',
      progress: 85,
      totalHours: 45,
      sessionsCompleted: 18,
      targetHours: 60,
      nextSession: '2024-01-16 09:00',
      topics: ['Calculus', 'Linear Algebra', 'Statistics'],
      difficulty: 'Advanced',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Quantum Physics',
      color: 'bg-blue-500',
      progress: 72,
      totalHours: 32,
      sessionsCompleted: 14,
      targetHours: 50,
      nextSession: '2024-01-17 14:00',
      topics: ['Wave Functions', 'Quantum Mechanics', 'Particle Physics'],
      difficulty: 'Expert',
      priority: 'High'
    },
    {
      id: 3,
      name: 'Organic Chemistry',
      color: 'bg-teal-500',
      progress: 91,
      totalHours: 38,
      sessionsCompleted: 16,
      targetHours: 40,
      nextSession: '2024-01-16 11:30',
      topics: ['Reaction Mechanisms', 'Synthesis', 'Spectroscopy'],
      difficulty: 'Intermediate',
      priority: 'Medium'
    },
    {
      id: 4,
      name: 'Molecular Biology',
      color: 'bg-green-500',
      progress: 67,
      totalHours: 28,
      sessionsCompleted: 12,
      targetHours: 45,
      nextSession: '2024-01-18 10:00',
      topics: ['DNA Structure', 'Protein Synthesis', 'Cell Division'],
      difficulty: 'Intermediate',
      priority: 'Medium'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNextSession = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Subjects</h2>
          <p className="text-gray-600">Manage your study subjects and track progress</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </button>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                      {subject.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(subject.priority)}`}>
                      {subject.priority}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-bold text-gray-900">{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${subject.color} transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Hours</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{subject.totalHours}</p>
                <p className="text-xs text-gray-500">of {subject.targetHours}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">Sessions</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{subject.sessionsCompleted}</p>
                <p className="text-xs text-gray-500">completed</p>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Topics</h4>
              <div className="flex flex-wrap gap-1">
                {subject.topics.slice(0, 2).map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {topic}
                  </span>
                ))}
                {subject.topics.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{subject.topics.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Next Session */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Next Session</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatNextSession(subject.nextSession)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Overall Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
            <p className="text-sm text-gray-600">Active Subjects</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.reduce((total, subject) => total + subject.totalHours, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Hours</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(subjects.reduce((total, subject) => total + subject.progress, 0) / subjects.length)}%
            </p>
            <p className="text-sm text-gray-600">Average Progress</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.reduce((total, subject) => total + subject.sessionsCompleted, 0)}
            </p>
            <p className="text-sm text-gray-600">Sessions Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;