import { useMemo } from "react";
import type { GitHubUser, Repository } from "../../types/github";
import RepositoryCard from "./repositoryCards";
import { Github, Loader2 } from "lucide-react";

interface RepositoryListProps {
    repositories: Repository[];
    user: GitHubUser;
    loading: boolean;
  }
  
  const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, user, loading }) => {
    const sortedRepositories = useMemo(() => {
      return [...repositories].sort((a, b) => b.stargazers_count - a.stargazers_count);
    }, [repositories]);
  
    return (
      <div className="card">
        <div className="card-padding">
          <div className="user-header">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="user-header-avatar"
            />
            <div className="user-header-info">
              <h2>{user.login}</h2>
              <p>
                {loading
                  ? "Loading repositories..."
                  : `${repositories.length} repositories`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <Loader2 size={24} className="spin" />
              <span>Loading repositories...</span>
            </div>
          ) : repositories.length === 0 ? (
            <div className="empty-state">
              <Github className="empty-icon" />
              <p>No public repositories found</p>
            </div>
          ) : (
            <div className="repo-list">
              {sortedRepositories.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default RepositoryList;