
import { fetchIssues } from './redux/slices/issuesSlice';
import Header from './components/header'

import Kanban from './components/kanban';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRepo } from './redux/slices/repoSlice';

function App() {
  const { issues, loading: issuesLoading, error: issuesError } = useAppSelector((state) => state.issues);
  const { repo, loading: repoLoading, error: repoError } = useAppSelector((state) => state.repo);
  const dispatch = useAppDispatch();

  console.log(repo)

  const handleLoadIssues = (url: string) => {
    dispatch(fetchIssues(url))
    dispatch(fetchRepo(url))
  }


  return (
    <>
      <Header onLoadIssues={handleLoadIssues} loading={issuesLoading || repoLoading} />
      <Kanban issues={issues} repoInfo={repo} />
    </>
  )
}

export default App
