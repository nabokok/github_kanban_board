import { render, screen } from '@testing-library/react';
import Kanban from './Kanban';
import { Issue } from '../../types/Github';
import { reorder, move } from './Kanban.utils';

describe('Kanban', () => {
  const issues: Issue[] = [
    {
      id: 1,
      number: 1,
      title: 'Issue 1',
      state: 'open',
      comments: 3,
      created_at: '2022-04-08T12:00:00Z',
      user_name: 'user1'
    },
    {
      id: 2,
      number: 2,
      title: 'Issue 2',
      state: 'closed',
      comments: 2,
      created_at: '2022-04-07T12:00:00Z',
      user_name: 'user2'
    },
    {
      id: 3,
      number: 3,
      title: 'Issue 3',
      state: 'open',
      comments: 0,
      created_at: '2022-04-06T12:00:00Z',
      user_name: 'user3'
    }
  ];

  const repoInfo = {
    owner: 'TestOwner',
    owner_url: 'https://example.com/owner',
    name: 'TestRepo',
    url: 'https://example.com/repo',
    star_count: 100
  };

  it('renders correctly', () => {
    render(<Kanban issues={issues} repoInfo={repoInfo} />);

    expect(screen.getByText(repoInfo.owner)).toBeInTheDocument();
    expect(screen.getByText(repoInfo.name)).toBeInTheDocument();

    expect(screen.getByText('ToDo')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();

    expect(screen.getAllByText(/issue/i).length).toBe(3);
  });

  it('reorders items within the list', () => {
    const list: Issue[] = [
      { id: 1, title: 'Item 1', state: 'open', number: 1, comments: 0, created_at: '2022-01-01', user_name: 'user1' },
      { id: 2, title: 'Item 2', state: 'open', number: 2, comments: 0, created_at: '2022-01-02', user_name: 'user2' },
      { id: 3, title: 'Item 3', state: 'open', number: 3, comments: 0, created_at: '2022-01-03', user_name: 'user3' },
    ];

    const startIndex = 0;
    const endIndex = 2;

    const result = reorder(list, startIndex, endIndex);

    expect(result).toEqual([
      { id: 2, title: 'Item 2', state: 'open', number: 2, comments: 0, created_at: '2022-01-02', user_name: 'user2' },
      { id: 3, title: 'Item 3', state: 'open', number: 3, comments: 0, created_at: '2022-01-03', user_name: 'user3' },
      { id: 1, title: 'Item 1', state: 'open', number: 1, comments: 0, created_at: '2022-01-01', user_name: 'user1' },
    ]);
  });

  it('moves item from source to destination list', () => {
    const sourceList: Issue[] = [ // Change the type to Issue[]
      { id: 1, title: 'Source Item 1', state: 'open', number: 1, comments: 0, created_at: '2022-01-01', user_name: 'user1' },
      { id: 2, title: 'Source Item 2', state: 'open', number: 2, comments: 0, created_at: '2022-01-02', user_name: 'user2' },
      { id: 3, title: 'Source Item 3', state: 'open', number: 3, comments: 0, created_at: '2022-01-03', user_name: 'user3' },
    ];

    const destinationList: Issue[] = [ // Change the type to Issue[]
      { id: 4, title: 'Destination Item 1', state: 'open', number: 4, comments: 0, created_at: '2022-01-04', user_name: 'user4' },
      { id: 5, title: 'Destination Item 2', state: 'open', number: 5, comments: 0, created_at: '2022-01-05', user_name: 'user5' },
    ];

    const droppableSource = { index: 1, droppableId: 'source' };
    const droppableDestination = { index: 1, droppableId: 'destination' };

    const result = move(sourceList, destinationList, droppableSource, droppableDestination);

    expect(result).toEqual({
      source: [
        { id: 1, title: 'Source Item 1', state: 'open', number: 1, comments: 0, created_at: '2022-01-01', user_name: 'user1' },
        { id: 3, title: 'Source Item 3', state: 'open', number: 3, comments: 0, created_at: '2022-01-03', user_name: 'user3' },
      ],
      destination: [
        { id: 4, title: 'Destination Item 1', state: 'open', number: 4, comments: 0, created_at: '2022-01-04', user_name: 'user4' },
        { id: 2, title: 'Source Item 2', state: 'open', number: 2, comments: 0, created_at: '2022-01-02', user_name: 'user2' },
        { id: 5, title: 'Destination Item 2', state: 'open', number: 5, comments: 0, created_at: '2022-01-05', user_name: 'user5' },
      ],
    });
  });
});
