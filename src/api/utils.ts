export const parseGithubUrl = (url: string) => {
  const { pathname } = new URL(url);
  const owner = pathname.split('/')[1];
  const repo = pathname.split('/')[2];
  return { owner, repo };
}
