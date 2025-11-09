/**
 * Application Tracker Component
 */
import React from 'react';

const ApplicationTracker = () => {
  // Placeholder data
  const applications = [
    { id: 1, name: 'H-1B Visa', status: 'draft', date: '2024-01-15' },
    { id: 2, name: 'Fulbright Scholarship', status: 'submitted', date: '2024-01-10' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Application Tracker</h2>
      {applications.length === 0 ? (
        <p className="text-gray-600">No applications yet. Start applying to opportunities!</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{app.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Applied: {app.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                  {app.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
