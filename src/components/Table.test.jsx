import { render, screen } from '@testing-library/react';
import Table from './Table';

test('renders the Table with Order List heading', () => {
  render(<Table />);
  expect(screen.getByText(/Order List/i)).toBeInTheDocument();
}); 