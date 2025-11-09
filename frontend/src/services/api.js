/**
 * Axios API client with interceptors for authentication
 */
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      } else if (status === 429) {
        toast.error('Too many requests. Please try again later.');
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      } else if (data && data.detail) {
        toast.error(data.detail);
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.');
    } else {
      // Error setting up request
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

// ============================================================================
// Auth API
// ============================================================================

export const authAPI = {
  register: (email, password) => {
    return api.post('/users/register', { email, password });
  },
  
  login: (email, password) => {
    return api.post('/users/login', { email, password });
  },
  
  getProfile: () => {
    return api.get('/users/profile');
  },
  
  updateProfile: (profileData) => {
    return api.put('/users/profile', profileData);
  },
};

// ============================================================================
// Matching API
// ============================================================================

export const matchingAPI = {
  getVisaMatches: (params = {}) => {
    return api.get('/matching/visas', { params });
  },
  
  getScholarshipMatches: (params = {}) => {
    return api.get('/matching/scholarships', { params });
  },
  
  listOpportunities: (params = {}) => {
    return api.get('/matching/opportunities', { params });
  },
  
  getOpportunity: (opportunityId) => {
    return api.get(`/matching/opportunities/${opportunityId}`);
  },
};

// ============================================================================
// Automation API
// ============================================================================

export const automationAPI = {
  fillForm: (formUrl, formData, savePdf = true) => {
    return api.post('/automation/fill-form', {
      form_url: formUrl,
      form_data: formData,
      save_pdf: savePdf,
    });
  },
  
  fillVisaForm: (formUrl) => {
    return api.post('/automation/fill-visa-form', null, {
      params: { form_url: formUrl },
    });
  },
  
  fillScholarshipForm: (formUrl, essay = '') => {
    return api.post('/automation/fill-scholarship-form', null, {
      params: { form_url: formUrl, essay },
    });
  },
};

// ============================================================================
// Simulations API
// ============================================================================

export const simulationsAPI = {
  runTaxSimulation: (data) => {
    return api.post('/sims/tax', data);
  },
  
  runCitizenshipSimulation: (data) => {
    return api.post('/sims/citizenship', data);
  },
  
  runWealthSimulation: (data) => {
    return api.post('/sims/wealth', null, { params: data });
  },
  
  getSimulationHistory: (limit = 10) => {
    return api.get('/sims/history', { params: { limit } });
  },
};

export default api;
