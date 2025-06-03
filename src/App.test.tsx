import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock React Router for testing
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Car Tracker App', () => {
  test('renders main heading', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /car tracker - smoc event/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    renderWithRouter(<App />);
    const welcomeText = screen.getByText(/welcome to the car tracker application/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /registration/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /floor/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /handoff/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /display/i })).toBeInTheDocument();
  });

  test('renders home page content by default', () => {
    renderWithRouter(<App />);

    const homeHeading = screen.getByRole('heading', { name: /welcome to car tracker/i });
    expect(homeHeading).toBeInTheDocument();

    const roleDescription = screen.getByText(/select your role from the navigation above/i);
    expect(roleDescription).toBeInTheDocument();
  });
});
