/**
 * Simulation Chart Component - Monte Carlo visualizations
 */
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { simulationsAPI } from '../services/api';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SimChart = () => {
  const [simType, setSimType] = useState('tax');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    current_country: 'United States',
    target_country: 'Germany',
    annual_income: 100000,
    years_to_simulate: 10,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const runSimulation = async () => {
    setLoading(true);
    try {
      let response;
      if (simType === 'tax') {
        response = await simulationsAPI.runTaxSimulation(formData);
      } else {
        response = await simulationsAPI.runCitizenshipSimulation({
          ...formData,
          education_level: 'Bachelor',
          work_experience_years: 5,
          language_proficiency: 'Advanced',
        });
      }
      setResult(response.data);
      toast.success('Simulation completed!');
    } catch (error) {
      console.error('Simulation error:', error);
      toast.error('Simulation failed');
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? {
    labels: result.visualization_data.map((d, i) => i),
    datasets: [
      {
        label: 'Distribution',
        data: result.visualization_data.map(d => d.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
    ],
  } : null;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Monte Carlo Simulations</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Simulation Type</label>
          <select
            value={simType}
            onChange={(e) => setSimType(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="tax">Tax Savings</option>
            <option value="citizenship">Citizenship Path</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Country</label>
            <input
              type="text"
              name="current_country"
              value={formData.current_country}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Country</label>
            <input
              type="text"
              name="target_country"
              value={formData.target_country}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {simType === 'tax' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Income (USD)</label>
              <input
                type="number"
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Years to Simulate</label>
              <input
                type="number"
                name="years_to_simulate"
                value={formData.years_to_simulate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        <button
          onClick={runSimulation}
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {loading ? 'Running Simulation...' : 'Run Simulation'}
        </button>
      </div>

      {result && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Expected Value</p>
              <p className="text-2xl font-bold text-primary-600">
                ${result.expected_value.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Median (50th)</p>
              <p className="text-2xl font-bold text-gray-900">
                ${result.percentile_50.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {(result.success_probability * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Std Dev</p>
              <p className="text-2xl font-bold text-gray-900">
                ${result.std_deviation.toLocaleString()}
              </p>
            </div>
          </div>
          {chartData && (
            <div className="mt-6">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimChart;
