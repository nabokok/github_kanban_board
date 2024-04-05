export interface Issue {
  id: number,
  title: string,
  state: string,
  number: number,
  comments: number,
  created_at: string,
  user_name: string,
}

export interface Repo {
  star_count: number,
  name: string,
  url: string,
  owner: string,
  owner_url: string
}