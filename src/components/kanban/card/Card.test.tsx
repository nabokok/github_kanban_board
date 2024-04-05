import { vi } from 'vitest'
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders correctly', () => {
    const item = {
      id: 1,
      title: 'Sample Issue',
      number: 1,
      created_at: '2022-01-01T00:00:00Z',
      user_name: 'John Doe',
      state: 'open',
      comments: 5,
    };

    vi.spyOn(Date, 'now').mockImplementation(() => new Date('2022-01-05T00:00:00Z').valueOf());

    render(<Card item={item} />);

    expect(screen.getByText('Sample Issue')).toBeInTheDocument();

    expect(screen.getByText('№1')).toBeInTheDocument();
    expect(screen.getByText('opened 4 days ago')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Comments: 5')).toBeInTheDocument();
  });
});
