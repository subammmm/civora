/**
 * Recommendation Card Component - Displays visa/scholarship matches
 */
import React, { useState, useEffect } from 'react';
import { matchingAPI } from '../services/api';
import toast from 'react-hot-toast';

const RecommendationCard = ({ type }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [type]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const response = type === 'visa' 
        ? await matchingAPI.getVisaMatches({ top_n: 10, min_score: 0.3 })
        : await matchingAPI.getScholarshipMatches({ top_n: 10, min_score: 0.3 });
      setMatches(response.data);
    } catch (error) {
      console.error('Failed to load matches:', error);
      toast.error('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <p className="text-gray-600">No {type} matches found. Please complete your profile to get recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {type === 'visa' ? 'Visa' : 'Scholarship'} Recommendations
      </h2>
      {matches.map((match) => (
        <div key={match.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{match.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{match.country}</p>
              {match.details && (
                <p className="text-sm text-gray-700 mt-2">{match.details}</p>
              )}
            </div>
            <div className="ml-4 flex flex-col items-end space-y-2">
              {match.match_score && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {(match.match_score * 100).toFixed(0)}% Match
                </span>
              )}
              {match.approval_probability && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {(match.approval_probability * 100).toFixed(0)}% Approval
                </span>
              )}
            </div>
          </div>
          {match.cost !== null && (
            <div className="mt-4 text-sm text-gray-600">
              Cost: ${match.cost.toLocaleString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecommendationCard;
