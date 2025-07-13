import React, { useState } from "react";
import { useDebounce, useGitHubSearch } from "./hooks/custome";
import type { GitHubUser } from "./types/github";
import { Github } from "lucide-react";
import SearchForm from "./components/search";
import ErrorMessage from "./components/ui/errorMessage";
import UserList from "./components/users/userList";

const GitHubExplorer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const {
    users,
    searchUsers,
    fetchUserDetails,
    fetchRepositories,
    clearUserData,
  } = useGitHubSearch();

  React.useEffect(() => {
    if (debouncedQuery.trim() && searchPerformed) {
      searchUsers(debouncedQuery);
    }
  }, [debouncedQuery, searchUsers, searchPerformed]);

  const handleSearch = () => {
    setSearchPerformed(true);
    clearUserData();
    if (query.trim()) {
      searchUsers(query);
    }
  };

  const handleUserSelect = (user: GitHubUser) => {
    fetchUserDetails(user.login);
    fetchRepositories(user.login);
  };
  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="container">
        <div className="main-wrapper">
          {/* Header */}
          <div className="header">
            <div className="header-title">
              <Github size={32} />
              <span>GitHub Explorer</span>
            </div>
            <p className="header-subtitle">
              Search for GitHub users and explore their repositories, followers,
              and following
            </p>
          </div>

          {/* Search Form */}
          <SearchForm
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            loading={users.loading}
          />

          {/* Error Message */}
          {users.error && (
            <ErrorMessage
              message={users.error}
              onRetry={() => searchUsers(query)}
            />
          )}

          {/* User Results */}
          {searchPerformed && users.data && !users.loading && (
            <UserList
              users={users.data}
              onUserSelect={handleUserSelect}
              query={query}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GitHubExplorer;