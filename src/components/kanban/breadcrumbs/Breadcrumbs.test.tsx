import { render, screen } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders correctly', () => {
    const repoInfo = {
      owner: 'John Doe',
      owner_url: 'https://github.com/johndoe',
      name: 'Sample Repo',
      url: 'https://github.com/johndoe/sample-repo',
      star_count: 100,
    };

    render(<Breadcrumbs repoInfo={repoInfo} />);


    const ownerLink = screen.getByText('John Doe');
    expect(ownerLink).toBeInTheDocument();
    expect(ownerLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(ownerLink).toHaveAttribute('target', '_blank');

    const repoLink = screen.getByText('Sample Repo');
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute('href', 'https://github.com/johndoe/sample-repo');
    expect(repoLink).toHaveAttribute('target', '_blank');

    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });
});
