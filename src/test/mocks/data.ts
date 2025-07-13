// Mock Data Factory for Testing
export const mockGitHubUser = (overrides = {}) => ({
  id: 1,
  login: "testuser",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  html_url: "https://github.com/testuser",
  name: "Test User",
  public_repos: 25,
  followers: 100,
  following: 50,
  bio: "Test user bio",
  company: "Test Company",
  location: "Test City",
  blog: "https://testuser.dev",
  created_at: "2020-01-01T00:00:00Z",
  ...overrides,
});

export const mockGitHubUsers = (count = 3) =>
  Array.from({ length: count }, (_, index) =>
    mockGitHubUser({
      id: index + 1,
      login: `testuser${index + 1}`,
      name: `Test User ${index + 1}`,
      public_repos: 10 + index * 5,
      followers: 50 + index * 25,
    })
  );

export const mockRepository = (overrides = {}) => ({
  id: 1,
  name: "test-repo",
  description: "A test repository",
  html_url: "https://github.com/testuser/test-repo",
  stargazers_count: 100,
  forks_count: 25,
  language: "TypeScript",
  updated_at: "2024-01-15T10:30:00Z",
  private: false,
  topics: ["react", "typescript", "testing"],
  ...overrides,
});

export const mockRepositories = (count = 5) =>
  Array.from({ length: count }, (_, index) =>
    mockRepository({
      id: index + 1,
      name: `test-repo-${index + 1}`,
      description: `Test repository ${index + 1}`,
      stargazers_count: 100 - index * 10,
      forks_count: 25 - index * 2,
      language: ["TypeScript", "JavaScript", "Python", "Java", "Go"][index % 5],
    })
  );

export const mockSearchUsersResponse = (overrides = {}) => ({
  total_count: 3,
  incomplete_results: false,
  items: mockGitHubUsers(),
  ...overrides,
});

export const mockApiResponse = <T>(data: T, overrides = {}) => ({
  data,
  loading: false,
  error: null,
  ...overrides,
});

export const mockFollowers = (count = 3) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 100,
    login: `follower${index + 1}`,
    avatar_url: `https://avatars.githubusercontent.com/u/${index + 100}?v=4`,
    html_url: `https://github.com/follower${index + 1}`,
  }));

// Error responses
export const mockRateLimitError = () => ({
  message:
    "API rate limit exceeded for 127.0.0.1. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
  documentation_url:
    "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting",
});

export const mockNotFoundError = () => ({
  message: "Not Found",
  documentation_url: "https://docs.github.com/rest",
});

// Factory functions for different scenarios
export const createMockUser = {
  withNoRepos: () => mockGitHubUser({ public_repos: 0 }),
  withManyRepos: () => mockGitHubUser({ public_repos: 500 }),
  withNoFollowers: () => mockGitHubUser({ followers: 0 }),
  withManyFollowers: () => mockGitHubUser({ followers: 10000 }),
  minimal: () =>
    mockGitHubUser({
      name: null,
      bio: null,
      company: null,
      location: null,
      blog: null,
    }),
};

export const createMockRepo = {
  withNoDescription: () => mockRepository({ description: null }),
  withNoLanguage: () => mockRepository({ language: null }),
  withNoTopics: () => mockRepository({ topics: [] }),
  withManyStars: () => mockRepository({ stargazers_count: 50000 }),
  private: () => mockRepository({ private: true }),
  archived: () => mockRepository({ archived: true }),
};
