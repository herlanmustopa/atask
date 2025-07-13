export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    public_repos: number;
    followers: number;
    followings: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
  topics: string[];
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface SearchUsersResponse {
  total_count: number;
  items: GitHubUser[];
}