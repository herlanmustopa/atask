import type { Repository, SearchUsersResponse } from "../types/github";
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
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status === 404) {
        throw new Error("User or repository not found.");
      }
      throw new Error(
        `GitHub API Error: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  static async searchUsers(query: string): Promise<SearchUsersResponse> {
    const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(
      query
    )}&per_page=${ITEMS_PER_PAGE}`;
    return this.makeRequest<SearchUsersResponse>(url);
  }

  static async getUserRepositories(username: string): Promise<Repository[]> {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`;
    return this.makeRequest<Repository[]>(url);
  }
}


export default GitHubApiService;