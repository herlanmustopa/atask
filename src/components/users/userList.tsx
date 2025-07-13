import { Github } from "lucide-react";
import type { GitHubUser } from "../../types/github";
import Card from "../ui/cards";
import UserCard from "./userCards";

interface UserListProps {
    users: GitHubUser[];
    onUserSelect: (user: GitHubUser) => void;
    query: string;
  }
  
  const UserList: React.FC<UserListProps> = ({ users, onUserSelect, query }) => {
    if (users.length === 0) {
      return (
        <Card className="p-6 text-center text-gray-500">
          <Github className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No users found for "{query}"</p>
          <p className="text-sm mt-1">Try searching for organizations like "facebook", "microsoft", or "google"</p>
        </Card>
      );
    }
  
    return (
       <div className="card">
      <div className="card-padding">
        <h2 className="section-title">
          Showing users for "{query}"
        </h2>
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={onUserSelect} />
          ))}
        </div>
      </div>
    </div>
    );
  };

export default UserList;