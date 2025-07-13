import type { GitHubFollower, GitHubUserDetail, Repository, SearchUsersResponse } from "../types/github";
import { GITHUB_API_BASE, ITEMS_PER_PAGE } from "../utils/constans";

class GitHubApiService {
  private static async makeRequest<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "GitHub-Explorer-App",
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown';
        throw new Error(`Rate limit exceeded. Reset at ${resetTime}. Try again later.`);
      }
      if (response.status === 404) {
        throw new Error('User or repository not found.');
      }
      if (response.status === 422) {
        throw new Error('Invalid search query.');
      }
      throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  

  static async searchUsers(query: string): Promise<SearchUsersResponse> {
    const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(
      query
    )}&per_page=${ITEMS_PER_PAGE}`;
    return this.makeRequest<SearchUsersResponse>(url);
  }

  static async getUserDetail(username: string): Promise<GitHubUserDetail> {
    const url = `${GITHUB_API_BASE}/users/${username}`;
    return this.makeRequest<GitHubUserDetail>(url);
  }

  static async getUserRepositories(username: string): Promise<Repository[]> {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`;
    return this.makeRequest<Repository[]>(url);
  }

  static async getUserFollowers(username: string): Promise<GitHubFollower[]> {
    const url = `${GITHUB_API_BASE}/users/${username}/followers?per_page=30`;
    return this.makeRequest<GitHubFollower[]>(url);
  }

  static async getUserFollowing(username: string): Promise<GitHubFollower[]> {
    const url = `${GITHUB_API_BASE}/users/${username}/following?per_page=30`;
    return this.makeRequest<GitHubFollower[]>(url);
  }
}


export default GitHubApiService;