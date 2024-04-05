import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header onLoadIssues={() => { }} loading={false} />);
    expect(screen.getByPlaceholderText('input search text')).toBeInTheDocument();
    expect(screen.getByText('Load issues')).toBeInTheDocument();
  });

  it('dispatches onLoadIssues when search button is clicked', async () => {
    const onLoadIssuesMock = vi.fn();
    render(<Header onLoadIssues={onLoadIssuesMock} loading={false} />);

    const searchInput = screen.getByPlaceholderText('input search text');
    const searchButton = screen.getByRole('button');

    await userEvent.type(searchInput, 'https://github.com/facebook/react');
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(onLoadIssuesMock).toHaveBeenCalledWith('https://github.com/facebook/react');
    });
  });

  it('disables search button when loading is true', () => {
    render(<Header onLoadIssues={() => { }} loading={true} />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toHaveClass('ant-btn-loading');
  });
});
