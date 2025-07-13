import { http, HttpResponse } from "msw";
import {
  mockSearchUsersResponse,
  mockGitHubUser,
  mockRepositories,
  mockFollowers,
  mockRateLimitError,
  mockNotFoundError,
} from "./data";

const GITHUB_API_BASE = "https://api.github.com";

export const handlers = [
  // Search users endpoint
  http.get(`${GITHUB_API_BASE}/search/users`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    // Simulate different scenarios based on query
    if (query === "rate-limit-test") {
      return HttpResponse.json(mockRateLimitError(), { status: 403 });
    }

    if (query === "no-results") {
      return HttpResponse.json(
        mockSearchUsersResponse({
          total_count: 0,
          items: [],
        })
      );
    }

    if (query === "network-error") {
      return HttpResponse.error();
    }

    // Default successful response
    return HttpResponse.json(mockSearchUsersResponse(), {
      headers: {
        "X-RateLimit-Remaining": "55",
        "X-RateLimit-Reset": Math.floor(Date.now() / 1000 + 3600).toString(),
      },
    });
  }),

  // Get user details endpoint
  http.get(`${GITHUB_API_BASE}/users/:username`, ({ params }) => {
    const { username } = params;

    if (username === "not-found-user") {
      return HttpResponse.json(mockNotFoundError(), { status: 404 });
    }

    if (username === "rate-limit-user") {
      return HttpResponse.json(mockRateLimitError(), { status: 403 });
    }

    // Return user details
    return HttpResponse.json(
      mockGitHubUser({
        login: username,
        name: `${username} Full Name`,
      }),
      {
        headers: {
          "X-RateLimit-Remaining": "54",
        },
      }
    );
  }),

  // Get user repositories endpoint
  http.get(
    `${GITHUB_API_BASE}/users/:username/repos`,
    ({ request, params }) => {
      const { username } = params;
      const url = new URL(request.url);
      const sort = url.searchParams.get("sort");
      const perPage = url.searchParams.get("per_page");

      if (username === "no-repos-user") {
        return HttpResponse.json([]);
      }

      if (username === "rate-limit-user") {
        return HttpResponse.json(mockRateLimitError(), { status: 403 });
      }

      const repos = mockRepositories(parseInt(perPage || "5"));

      // Sort repositories if requested
      if (sort === "updated") {
        repos.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }

      return HttpResponse.json(repos, {
        headers: {
          "X-RateLimit-Remaining": "53",
        },
      });
    }
  ),

  // Get user followers endpoint
  http.get(`${GITHUB_API_BASE}/users/:username/followers`, ({ params }) => {
    const { username } = params;

    if (username === "no-followers-user") {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(mockFollowers(), {
      headers: {
        "X-RateLimit-Remaining": "52",
      },
    });
  }),

  // Get user following endpoint
  http.get(`${GITHUB_API_BASE}/users/:username/following`, ({ params }) => {
    const { username } = params;

    if (username === "no-following-user") {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(mockFollowers(), {
      headers: {
        "X-RateLimit-Remaining": "51",
      },
    });
  }),
];

// Error handlers for testing error scenarios
export const errorHandlers = [
  http.get(`${GITHUB_API_BASE}/search/users`, () => {
    return HttpResponse.json(mockRateLimitError(), { status: 403 });
  }),
];

// Network error handlers
export const networkErrorHandlers = [
  http.get(`${GITHUB_API_BASE}/*`, () => {
    return HttpResponse.error();
  }),
];
