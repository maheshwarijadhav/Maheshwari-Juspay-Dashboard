import { render, screen } from '@testing-library/react';
import DashboardPage from './Dashboard';

test('renders the Dashboard with eCommerce heading', () => {
  render(<DashboardPage />);
  expect(screen.getByText(/eCommerce/i)).toBeInTheDocument();
}); 