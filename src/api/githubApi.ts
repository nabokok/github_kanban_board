import axios from "axios";
import { parseGithubUrl } from "./utils";
import { GitHubIssue } from "../types/GitHubIssue";
import { Issue, Repo } from "../types/Github";

const API_URL = 'https://api.github.com';

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

export const fetchAllIssues = (url: string): Promise<Issue[]> => {
    const { owner, repo } = parseGithubUrl(url);

    return axios(`${API_URL}/repos/${owner}/${repo}/issues?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
        .then((res) => {
            const issues = res.data.map((issue: GitHubIssue) => ({
                id: issue.id,
                title: issue.title,
                state: issue.state,
                number: issue.number,
                comments: issue.comments,
                created_at: issue.created_at,
                user_name: issue.user.login,
            }))

            return issues;
        })
}

export const fetchOneRepo = (url: string): Promise<Repo> => {
    const { owner, repo } = parseGithubUrl(url);

    return axios(`${API_URL}/repos/${owner}/${repo}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
        .then((res) => {
            return {
                star_count: res.data.stargazers_count,
                name: res.data.name,
                url: res.data.html_url,
                owner: res.data.owner.login,
                owner_url: res.data.owner.html_url
            };
        })
}