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
      console.log("🔍 Searching for users:", query);
      const response = await GitHubApiService.searchUsers(query);
      console.log("Search API response:", response);

      // Get basic search results first
      const basicUsers = response.items || [];
      console.log("👥 Basic users found:", basicUsers.length);

      if (basicUsers.length === 0) {
        setUsers({ data: [], loading: false, error: null });
        return;
      }

      setUsers({ data: basicUsers, loading: false, error: null });

      console.log("Fetching detailed user data...");
      const detailedUsersPromises = basicUsers.map(async (user, index) => {
        try {
          console.log(
            `Fetching details for user ${index + 1}/${basicUsers.length}: ${
              user.login
            }`
          );
          const detailResponse = await GitHubApiService.getUserDetail(
            user.login
          );
          console.log(`Got details for ${user.login}:`, {
            repos: detailResponse.public_repos,
            followers: detailResponse.followers,
            following: detailResponse.followings,
          });

          return {
            ...user,
            public_repos: detailResponse.public_repos || 0,
            followers: detailResponse.followers || 0,
            following: detailResponse.followings || 0,
            name: detailResponse.name || user.login,
            bio: detailResponse.bio,
            company: detailResponse.company,
            location: detailResponse.location,
            blog: detailResponse.blog,
            created_at: detailResponse.created_at,
          };
        } catch (error) {
          console.warn(`Failed to fetch details for ${user.login}:`, error);
          return {
            ...user,
            public_repos: user.public_repos || 0,
            followers: user.followers || 0,
            following: user.followings || 0,
          };
        }
      });

      // Update with detailed data when available
      const detailedUsers = await Promise.all(detailedUsersPromises);
      console.log("Final detailed users:", detailedUsers);
      setUsers({ data: detailedUsers, loading: false, error: null });
    } catch (error) {
      console.error("Search users error:", error);
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
