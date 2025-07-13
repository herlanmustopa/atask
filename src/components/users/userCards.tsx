import { User } from "lucide-react";
import type { GitHubUser } from "../../types/github";
import { formatNumber } from "../../utils/constans";


const UserCard: React.FC<{
  user: GitHubUser;
  onClick: (user: GitHubUser) => void;
}> = ({ user, onClick }) => {
  return (
    <div className="user-card-inline" onClick={() => onClick(user)}>
      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-avatar-inline"
      />
      <div className="user-info-inline">
        <div className="user-name-inline">{user.login}</div>
        {user.name && <div className="user-fullname-inline">{user.name}</div>}
      </div>
      <div className="user-stats-inline">
        <div className="user-stat-inline">
          <User size={16} />
          <span>{formatNumber(user.public_repos || 0)} repos</span>
        </div>
        <div>{formatNumber(user.followers || 0)} followers</div>
      </div>
    </div>
  );
};

export default UserCard;
