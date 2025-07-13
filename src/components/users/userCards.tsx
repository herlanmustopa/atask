import { User } from "lucide-react";
import type { GitHubUser } from "../../types/github";
import { formatNumber } from "../../utils/constans";

interface UserCardProps {
  user: GitHubUser;
  onClick: (user: GitHubUser) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className="user-card" onClick={() => onClick(user)}>
      <img src={user.avatar_url} alt={user.login} className="user-avatar" />
      <div className="user-info">
        <div className="user-name">{user.login}</div>
        {user.name && <div className="user-fullname">{user.name}</div>}
      </div>
      <div className="user-stats">
        <div className="user-stat">
          <User size={16} />
          <span>{formatNumber(user.public_repos)} repos</span>
        </div>
        <div>{formatNumber(user.followers)} followers</div>
      </div>
    </div>
  );
};

export default UserCard;
