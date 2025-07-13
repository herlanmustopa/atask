import { Calendar, ExternalLink, GitFork, Star } from "lucide-react";
import { formatDate, formatNumber, getLanguageColor } from "../../utils/constans";
import type { Repository } from "../../types/github";

interface RepositoryCardProps {
    repository: Repository;
  }
  
  const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
    return (
      <div className="repo-card">
        <div className="repo-header">
          <div className="repo-title">
            <div className="repo-name">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
              >
                {repository.name}
                <ExternalLink size={16} />
              </a>
            </div>
            {repository.description && (
              <div className="repo-description">{repository.description}</div>
            )}
          </div>
          <div className="repo-stats">
            <div className="repo-stat">
              <Star size={16} />
              <span>{formatNumber(repository.stargazers_count)}</span>
            </div>
            <div className="repo-stat">
              <GitFork size={16} />
              <span>{formatNumber(repository.forks_count)}</span>
            </div>
          </div>
        </div>

        <div className="repo-meta">
          {repository.language && (
            <div className="repo-language">
              <span
                className="language-dot"
                style={{
                  backgroundColor: getLanguageColor(repository.language),
                }}
              />
              <span>{repository.language}</span>
            </div>
          )}
          <div className="repo-stat">
            <Calendar size={16} />
            <span>Updated {formatDate(repository.updated_at)}</span>
          </div>
        </div>

        {repository.topics && repository.topics.length > 0 && (
          <div className="repo-topics">
            {repository.topics.slice(0, 5).map((topic) => (
              <span key={topic} className="topic-tag">
                {topic}
              </span>
            ))}
            {repository.topics.length > 5 && (
              <span className="topic-more">
                +{repository.topics.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  export default RepositoryCard;