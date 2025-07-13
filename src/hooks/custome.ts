import React, { useCallback, useState } from "react";
import type { ApiResponse, GitHubFollower, GitHubUser, GitHubUserDetail, Repository } from "../types/github";
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

  const [selectedUserDetail, setSelectedUserDetail] = useState<
    ApiResponse<GitHubUserDetail>
  >({
    data: null,
    loading: false,
    error: null,
  });

  const [repositories, setRepositories] = useState<ApiResponse<Repository[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const [followers, setFollowers] = useState<ApiResponse<GitHubFollower[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const [following, setFollowing] = useState<ApiResponse<GitHubFollower[]>>({
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

  const fetchUserDetails = useCallback(async (username: string) => {
    setSelectedUserDetail({ data: null, loading: true, error: null });

    try {
      const userDetail = await GitHubApiService.getUserDetail(username);
      setSelectedUserDetail({ data: userDetail, loading: false, error: null });
    } catch (error) {
      setSelectedUserDetail({
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

  const fetchFollowers = useCallback(async (username: string) => {
    setFollowers({ data: null, loading: true, error: null });

    try {
      const followersData = await GitHubApiService.getUserFollowers(username);
      setFollowers({ data: followersData, loading: false, error: null });
    } catch (error) {
      setFollowers({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }, []);

  const fetchFollowing = useCallback(async (username: string) => {
    setFollowing({ data: null, loading: true, error: null });

    try {
      const followingData = await GitHubApiService.getUserFollowing(username);
      setFollowing({ data: followingData, loading: false, error: null });
    } catch (error) {
      setFollowing({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }, []);

  const clearUserData = useCallback(() => {
    setSelectedUserDetail({ data: null, loading: false, error: null });
    setRepositories({ data: null, loading: false, error: null });
    setFollowers({ data: null, loading: false, error: null });
    setFollowing({ data: null, loading: false, error: null });
  }, []);

  return {
    users,
    selectedUserDetail,
    repositories,
    followers,
    following,
    searchUsers,
    fetchUserDetails,
    fetchRepositories,
    fetchFollowers,
    fetchFollowing,
    clearUserData,
  };
};
