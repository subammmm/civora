/**
 * Dashboard Component - Main hub with tabs
 */
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileForm from './ProfileForm';
import RecommendationCard from './RecommendationCard';
import SimChart from './SimChart';
import ApplicationTracker from './ApplicationTracker';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'scholarships', name: 'Scholarships', icon: '🎓' },
    { id: 'visas', name: 'Visas', icon: '✈️' },
    { id: 'simulations', name: 'Simulations', icon: '📊' },
    { id: 'tracker', name: 'Tracker', icon: '📋' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />;
      case 'scholarships':
        return <RecommendationCard type="scholarship" />;
      case 'visas':
        return <RecommendationCard type="visa" />;
      case 'simulations':
        return <SimChart />;
      case 'tracker':
        return <ApplicationTracker />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary-600">GlobalForge.ai</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
