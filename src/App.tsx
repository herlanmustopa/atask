import React, { useState } from "react";
import { useDebounce, useGitHubSearch } from "./hooks/custome";
import type { GitHubUser } from "./types/github";
import { Github } from "lucide-react";
import SearchForm from "./components/search";
import ErrorMessage from "./components/ui/errorMessage";
import UserList from "./components/users/userList";
import RepositoryList from "./components/repository/repositoryList";

const GitHubExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  const { users, repositories, searchUsers, fetchRepositories, clearRepositories } = useGitHubSearch();

  React.useEffect(() => {
    if (debouncedQuery.trim() && searchPerformed) {
      searchUsers(debouncedQuery);
    }
  }, [debouncedQuery, searchUsers, searchPerformed]);

  const handleSearch = () => {
    setSearchPerformed(true);
    setSelectedUser(null);
    clearRepositories();
    if (query.trim()) {
      searchUsers(query);
    }
  };

  const handleUserSelect = (user: GitHubUser) => {
    setSelectedUser(user);
    fetchRepositories(user.login);
  };

  return (
    <div className="container">
      <div className="main-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <Github size={32} />
            <span>GitHub Explorer</span>
          </div>
          <p className="header-subtitle">
            Search for GitHub users and explore their repositories
          </p>
        </div>

        <SearchForm
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          loading={users.loading}
        />

        {users.error && (
          <ErrorMessage
            message={users.error}
            onRetry={() => searchUsers(query)}
          />
        )}

        {searchPerformed && users.data && !users.loading && (
          <UserList
            users={users.data}
            onUserSelect={handleUserSelect}
            query={query}
          />
        )}

        {repositories.error && selectedUser && (
          <ErrorMessage
            message={repositories.error}
            onRetry={() => fetchRepositories(selectedUser.login)}
          />
        )}

        {selectedUser && (
          <RepositoryList
            repositories={repositories.data || []}
            user={selectedUser}
            loading={repositories.loading}
          />
        )}
      </div>
    </div>
  );
};

export default GitHubExplorer;