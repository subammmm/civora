/**
 * Dashboard Component Tests
 */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from '../components/Dashboard';

// Mock user context
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    user: { email: 'test@example.com', profile: {} },
    logout: jest.fn(),
  }),
}));

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('GlobalForge.ai')).toBeInTheDocument();
  });

  it('displays all tabs', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Scholarships')).toBeInTheDocument();
    expect(screen.getByText('Visas')).toBeInTheDocument();
    expect(screen.getByText('Simulations')).toBeInTheDocument();
    expect(screen.getByText('Tracker')).toBeInTheDocument();
  });
});
