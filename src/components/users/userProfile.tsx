import type { GitHubUserDetail } from "../../types/github";
import { formatNumber } from "../../utils/constans";

const UserProfile: React.FC<{
  user: GitHubUserDetail;
  repositoryCount: number;
}> = ({ user, repositoryCount }) => {
  return (
    <div className="card">
      <div className="card-padding">
        <div className="user-profile">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="user-profile-avatar"
          />
          <div className="user-profile-info">
            <h2 className="user-profile-name">{user.name || user.login}</h2>
            <p className="user-profile-username">@{user.login}</p>

            {user.bio && <p className="user-profile-bio">{user.bio}</p>}

            <div className="user-profile-meta">
              {user.company && (
                <div className="user-meta-item">
                  <span>🏢 {user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="user-meta-item">
                  <span>📍 {user.location}</span>
                </div>
              )}
              {user.blog && (
                <div className="user-meta-item">
                  <a href={user.blog} target="_blank" rel="noopener noreferrer">
                    🔗 {user.blog}
                  </a>
                </div>
              )}
              <div className="user-meta-item">
                {/* <span>📅 Joined {formatDate(user?.created_at )}</span> */}
              </div>
            </div>

            <div className="user-profile-stats">
              <div className="user-stat">
                <span className="stat-number">
                  {formatNumber(repositoryCount)}
                </span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="user-stat">
                <span className="stat-number">
                  {formatNumber(user.followers)}
                </span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="user-stat">
                <span className="stat-number">
                  {formatNumber(user.followings)}
                </span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;