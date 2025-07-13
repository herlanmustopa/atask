import { User } from "lucide-react";
import type { GitHubUser } from "../../types/github";
import Card from "../ui/cards";
import { formatNumber } from "../../utils/constans";

interface UserCardProps {
    user: GitHubUser;
    onClick: (user: GitHubUser) => void;
  }
  
  const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
      <Card hoverable onClick={() => onClick(user)} className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{user.login}</h3>
            {user.name && <p className="text-sm text-gray-600">{user.name}</p>}
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center gap-1 mb-1">
              <User className="w-4 h-4" />
              <span>{formatNumber(user.public_repos)} repos</span>
            </div>
            <div>{formatNumber(user.followers)} followers</div>
          </div>
        </div>
      </Card>
    );
  };

  export default UserCard;