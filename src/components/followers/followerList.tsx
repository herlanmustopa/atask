import { Loader2, User } from "lucide-react";
import type { GitHubFollower } from "../../types/github";

const FollowersList: React.FC<{
  followers: GitHubFollower[];
  title: string;
  loading: boolean;
}> = ({ followers, title, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="card-padding">
          <h3 className="section-title">{title}</h3>
          <div className="loading-container">
            <Loader2 size={20} className="spin" />
            <span>Loading {title.toLowerCase()}...</span>
          </div>
        </div>
      </div>
    );
  }

  if (followers.length === 0) {
    return (
      <div className="card">
        <div className="card-padding">
          <h3 className="section-title">{title}</h3>
          <div className="empty-state">
            <User className="empty-icon" />
            <p>No {title.toLowerCase()} found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-padding">
        <h3 className="section-title">
          {title} ({followers.length})
        </h3>
        <div className="followers-grid">
          {followers.slice(0, 12).map((follower) => (
            <div key={follower.id} className="follower-card">
              <a
                href={follower.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="follower-link"
              >
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  className="follower-avatar"
                />
                <span className="follower-name">{follower.login}</span>
              </a>
            </div>
          ))}
          {followers.length > 12 && (
            <div className="follower-card more-followers">
              <span>+{followers.length - 12} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersList;