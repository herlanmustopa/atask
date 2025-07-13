import type {
  GitHubFollower,
  GitHubUserDetail,
  Repository,
  SearchUsersResponse,
} from "../types/github";
import { GITHUB_API_BASE, ITEMS_PER_PAGE } from "../utils/constans";

const apiCache = new Map<
  string,
  { data: unknown; timestamp: number; ttl: number }
>();

export const getCachedData = (key: string) => {
  const cached = apiCache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }
  return null;
};

export const setCachedData = (key: string, data: unknown, ttlMinutes = 10) => {
  apiCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMinutes * 60 * 1000,
  });
};

class GitHubApiService {
  private static async makeRequest<T>(
    url: string,
    useCache = true
  ): Promise<T> {
    // Check cache first
    if (useCache) {
      const cached = getCachedData(url);
      if (cached) {
        console.log("Using cached data for:", url);
        return cached as T;
      }
    }

    // Add longer delay to prevent rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Making API request to:", url);

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "GitHub-Explorer-App",
      },
    });

    // Check rate limit headers
    const rateLimit = response.headers.get("X-RateLimit-Remaining");
    const rateLimitReset = response.headers.get("X-RateLimit-Reset");

    console.log(`Rate limit remaining: ${rateLimit}`);

    if (!response.ok) {
      if (response.status === 403) {
        const resetTime = rateLimitReset
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          : "unknown";
        throw new Error(`GitHub API rate limit exceeded! 
        
Without authentication, you only get 60 requests per hour.
Rate limit resets at: ${resetTime}

Solutions:
1. Wait for rate limit reset
2. Use GitHub Personal Access Token for 5000 requests/hour
3. Try searching for different users later

Current remaining requests: ${rateLimit || 0}`);
      }
      if (response.status === 404) {
        throw new Error("User or repository not found.");
      }
      if (response.status === 422) {
        throw new Error("Invalid search query.");
      }
      throw new Error(
        `GitHub API Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    if (useCache) {
      setCachedData(url, data, 15);
    }

    return data;
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
