import { ChevronDown, ChevronRight, Github, Loader2 } from "lucide-react";
import type { ExpandedUserData, GitHubUser } from "../../types/github";
import UserCard from "./userCards";
import RepositoryCard from "../repository/repositoryCards";

const UserAccordionItem: React.FC<{
  user: GitHubUser;
  isExpanded: boolean;
  expandedData: ExpandedUserData | null;
  onToggle: () => void;
  onUserSelect: (user: GitHubUser) => void;
}> = ({ user, isExpanded, expandedData, onToggle, onUserSelect }) => {
  const handleUserClick = () => {
    onUserSelect(user);
    onToggle();
  };

  return (
    <div className="user-accordion-item">
      <div className="user-accordion-header" onClick={handleUserClick}>
        <UserCard user={user} onClick={() => {}} />
        <button className="accordion-toggle">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="user-accordion-content">
          {expandedData?.loading && (
            <div className="accordion-loading">
              <Loader2 size={20} className="spin" />
              <span>Loading repositories...</span>
            </div>
          )}

          {expandedData?.error && (
            <div className="accordion-error">
              <p>Error loading repositories: {expandedData.error}</p>
            </div>
          )}

          {expandedData?.repositories &&
            Array.isArray(expandedData.repositories) &&
            expandedData.repositories.length > 0 && (
              <div className="repositories-section">
                <h4 className="repositories-title">
                  Repositories ({expandedData.repositories.length})
                </h4>
                <div className="repositories-list">
                  {expandedData.repositories
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 6) // Show top 6 repositories
                    .map((repo) => (
                      <RepositoryCard key={repo.id} repository={repo} />
                    ))}
                </div>
                {expandedData.repositories.length > 6 && (
                  <div className="view-all-repos">
                    <a
                      href={user.html_url + "?tab=repositories"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-all-link"
                    >
                      View all {expandedData.repositories.length} repositories →
                    </a>
                  </div>
                )}
              </div>
            )}

          {expandedData?.repositories &&
            Array.isArray(expandedData.repositories) &&
            expandedData.repositories.length === 0 && (
              <div className="no-repositories">
                <Github size={24} />
                <p>No public repositories found</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default UserAccordionItem;