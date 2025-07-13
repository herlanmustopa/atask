import { useMemo } from "react";
import type { Repository } from "../../types/github";
import RepositoryCard from "./repositoryCards";
import { Github, Loader2 } from "lucide-react";

const RepositoryList: React.FC<{
  repositories: Repository[];
  loading: boolean;
}> = ({ repositories, loading }) => {
  const sortedRepositories = useMemo(() => {
    return [...repositories].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
  }, [repositories]);

  if (loading) {
    return (
      <div className="card">
        <div className="card-padding">
          <h3 className="section-title">Repositories</h3>
          <div className="loading-container">
            <Loader2 size={24} className="spin" />
            <span>Loading repositories...</span>
          </div>
        </div>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="card">
        <div className="card-padding">
          <h3 className="section-title">Repositories</h3>
          <div className="empty-state">
            <Github className="empty-icon" />
            <p>No public repositories found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-padding">
        <h3 className="section-title">Repositories ({repositories.length})</h3>
        <div className="repo-list">
          {sortedRepositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};
  export default RepositoryList;