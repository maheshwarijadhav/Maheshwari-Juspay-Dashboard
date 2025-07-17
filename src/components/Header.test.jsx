import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the header with Dashboards text', () => {
  render(<Header />);
  expect(screen.getByText(/Dashboards/i)).toBeInTheDocument();
}); 