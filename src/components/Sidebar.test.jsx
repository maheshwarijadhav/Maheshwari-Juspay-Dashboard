import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

test('renders the Sidebar with Dashboards text', () => {
  render(<Sidebar />);
  expect(screen.getByText(/Dashboards/i)).toBeInTheDocument();
}); 