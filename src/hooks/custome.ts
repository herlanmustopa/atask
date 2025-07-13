import React, { useCallback, useState } from "react";
import type { ApiResponse, GitHubUser, Repository } from "../types/github";
import GitHubApiService from "../service/api.service";

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useGitHubSearch = () => {
  const [users, setUsers] = useState<ApiResponse<GitHubUser[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const [repositories, setRepositories] = useState<ApiResponse<Repository[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers({ data: null, loading: false, error: null });
      return;
    }

    setUsers({ data: null, loading: true, error: null });

    try {
      const response = await GitHubApiService.searchUsers(query);
      setUsers({ data: response.items, loading: false, error: null });
    } catch (error) {
      setUsers({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }, []);

  const fetchRepositories = useCallback(async (username: string) => {
    setRepositories({ data: null, loading: true, error: null });

    try {
      const repos = await GitHubApiService.getUserRepositories(username);
      setRepositories({ data: repos, loading: false, error: null });
    } catch (error) {
      setRepositories({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }, []);

  const clearRepositories = useCallback(() => {
    setRepositories({ data: null, loading: false, error: null });
  }, []);

  return {
    users,
    repositories,
    searchUsers,
    fetchRepositories,
    clearRepositories,
  };
};
