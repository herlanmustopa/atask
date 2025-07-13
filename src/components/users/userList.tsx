import { Github } from "lucide-react";
import type { ExpandedUserData, GitHubUser, UserAccordionProps } from "../../types/github";
import { useState } from "react";
import UserAccordionItem from "./userAccordion";
  
import '../../styles/accordion.css'
const UserList: React.FC<UserAccordionProps> = ({
  users,
  onUserSelect,
  query,
}) => {
  const [expandedUsers, setExpandedUsers] = useState<
    Record<number, ExpandedUserData>
  >({});
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  if (!users || !Array.isArray(users) || users.length === 0) {
    return (
      <div className="card">
        <div className="card-padding">
          <div className="empty-state">
            <Github className="empty-icon" />
            <p>No users found for "{query || ""}"</p>
            <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
              Try searching for organizations like "facebook", "microsoft", or
              "google"
            </p>
          </div>
        </div>
      </div>
    );
  }
  const fetchUserRepositories = async (user: GitHubUser) => {
    if (!user || !user.id || !user.login) {
      return;
    }

    if (
      expandedUsers[user.id]?.repositories &&
      Array.isArray(expandedUsers[user.id]?.repositories)
    ) {
      return;
    }

    setExpandedUsers((prev) => ({
      ...prev,
      [user.id]: { repositories: [], loading: true, error: null },
    }));

    try {
      const response = await fetch(
        `https://api.github.com/users/${user.login}/repos?sort=updated&per_page=100`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "GitHub-Explorer-App",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      const data = await response.json();

      const repositories = Array.isArray(data) ? data : [];
      const validRepositories = repositories
        .map((repo) => {
          if (!repo || typeof repo !== "object") {
            return null;
          }
          return {
            id: repo.id || Date.now() + Math.random(),
            name: repo.name || "Unknown",
            description: repo.description || null,
            html_url: repo.html_url || "#",
            stargazers_count: Number(repo.stargazers_count) || 0,
            forks_count: Number(repo.forks_count) || 0,
            language: repo.language || null,
            updated_at: repo.updated_at || new Date().toISOString(),
            private: Boolean(repo.private),
            topics: Array.isArray(repo.topics) ? repo.topics : [],
          };
        })
        .filter(Boolean);

      setExpandedUsers((prev) => ({
        ...prev,
        [user.id]: {
          repositories: validRepositories as ExpandedUserData['repositories'],
          loading: false,
          error: null,
        },
      }));
    } catch (error) {
      setExpandedUsers((prev) => ({
        ...prev,
        [user.id]: {
          repositories: [],
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        },
      }));
    }
  };

  const handleToggle = (user: GitHubUser) => {
    if (!user || !user.id) {
      return;
    }

    const isCurrentlyExpanded = expandedUserId === user.id;

    if (isCurrentlyExpanded) {
      setExpandedUserId(null);
    } else {
      setExpandedUserId(user.id);
      fetchUserRepositories(user);
    }
  };

  const handleUserSelect = (user: GitHubUser) => {
    if (!user || !onUserSelect) {
      return;
    }
    onUserSelect(user);
    handleToggle(user);
  };

  if (users.length === 0) {
    return (
      <div className="card">
        <div className="card-padding">
          <div className="empty-state">
            <Github className="empty-icon" />
            <p>No users found for "{query}"</p>
            <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
              Try searching for organizations like "facebook", "microsoft", or
              "google"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-padding">
        <h2 className="section-title">Showing users for "{query}"</h2>
        <div className="user-accordion">
          {users.map((user) => (
            <UserAccordionItem
              key={user.id}
              user={user}
              isExpanded={expandedUserId === user.id}
              expandedData={expandedUsers[user.id] || null}
              onToggle={() => handleToggle(user)}
              onUserSelect={handleUserSelect}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default UserList;