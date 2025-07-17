import { render, screen } from '@testing-library/react';
import NotificationPanel from './RightBar';

test('renders the NotificationPanel with Notifications heading', () => {
  render(<NotificationPanel />);
  expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
}); 