
import { message } from 'antd';
import { fetchIssues } from './redux/slices/issuesSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRepo } from './redux/slices/repoSlice';
import Header from './components/header'
import Kanban from './components/kanban';

function App() {
  const { issues, loading: issuesLoading, error: issuesError } = useAppSelector((state) => state.issues);
  const { repo, loading: repoLoading, error: repoError } = useAppSelector((state) => state.repo);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  if (issuesError || repoError) {
    messageApi.open({
      type: 'error',
      content: issuesError || repoError,
    });
  }

  const handleLoadIssues = (url: string) => {
    dispatch(fetchIssues(url))
    dispatch(fetchRepo(url))
  }


  return (
    <>
      {contextHolder}
      <Header onLoadIssues={handleLoadIssues} loading={issuesLoading || repoLoading} />
      <Kanban issues={issues} repoInfo={repo} />
    </>
  )
}

export default App
