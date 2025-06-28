import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  Target,
  TrendingUp,
  Award,
  X
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
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-purple-500',
    targetHours: '',
    difficulty: 'Beginner',
    priority: 'Medium',
    topics: ''
  });

  const colorOptions = [
    'bg-purple-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500'
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'Medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSubject) {
      setSubjects(prev => prev.map(subject => 
        subject.id === editingSubject.id 
          ? {
              ...subject,
              ...formData,
              topics: formData.topics.split(',').map(t => t.trim()).filter(t => t),
              targetHours: parseInt(formData.targetHours)
            }
          : subject
      ));
      toast.success('Subject Updated');
      setEditingSubject(null);
    } else {
      const newSubject = {
        id: Date.now(),
        ...formData,
        progress: 0,
        totalHours: 0,
        sessionsCompleted: 0,
        nextSession: new Date().toISOString(),
        topics: formData.topics.split(',').map(t => t.trim()).filter(t => t),
        targetHours: parseInt(formData.targetHours)
      };
      setSubjects(prev => [...prev, newSubject]);
      toast.success('Subject Added');
    }
    
    setFormData({
      name: '',
      color: 'bg-purple-500',
      targetHours: '',
      difficulty: 'Beginner',
      priority: 'Medium',
      topics: ''
    });
    setShowAddModal(false);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      color: subject.color,
      targetHours: subject.targetHours.toString(),
      difficulty: subject.difficulty,
      priority: subject.priority,
      topics: subject.topics.join(', ')
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
    toast.success('Subject Deleted');
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingSubject(null);
    setFormData({
      name: '',
      color: 'bg-purple-500',
      targetHours: '',
      difficulty: 'Beginner',
      priority: 'Medium',
      topics: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Subjects</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your study subjects and track progress</p>
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
          <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
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
                <button 
                  onClick={() => handleEdit(subject)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(subject.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${subject.color} transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Hours</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{subject.totalHours}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">of {subject.targetHours}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">Sessions</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{subject.sessionsCompleted}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">completed</p>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Topics</h4>
              <div className="flex flex-wrap gap-1">
                {subject.topics.slice(0, 2).map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    {topic}
                  </span>
                ))}
                {subject.topics.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    +{subject.topics.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Next Session */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Next Session</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatNextSession(subject.nextSession)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Overall Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{subjects.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Subjects</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {subjects.reduce((total, subject) => total + subject.totalHours, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(subjects.reduce((total, subject) => total + subject.progress, 0) / subjects.length)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Progress</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {subjects.reduce((total, subject) => total + subject.sessionsCompleted, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
          </div>
        </div>
      </div>

      {/* Add/Edit Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter subject name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({...formData, color})}
                      className={`w-8 h-8 ${color} rounded-full border-2 ${
                        formData.color === color ? 'border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Hours</label>
                <input
                  type="number"
                  value={formData.targetHours}
                  onChange={(e) => setFormData({...formData, targetHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter target hours"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topics (comma-separated)</label>
                <textarea
                  value={formData.topics}
                  onChange={(e) => setFormData({...formData, topics: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter topics separated by commas"
                  rows="3"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingSubject ? 'Update' : 'Add'} Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;