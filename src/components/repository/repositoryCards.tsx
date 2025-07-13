import { Calendar, ExternalLink, GitFork, Star } from "lucide-react";
import { formatDate, formatNumber, getLanguageColor } from "../../utils/constans";
import type { Repository } from "../../types/github";

  
  const RepositoryCard: React.FC<{ repository: Repository }> = ({
    repository,
  }) => {
    // Safety check for repository object
    if (!repository || typeof repository !== "object") {
      return null;
    }

    const {
      id = 0,
      name = "Unknown Repository",
      description = null,
      html_url = "#",
      stargazers_count = 0,
      forks_count = 0,
      language = null,
      updated_at = new Date().toISOString(),
      topics = [],
    } = repository;

    const safeTopics = Array.isArray(topics) ? topics : [];

    return (
      <div className="repo-accordion-card">
        <div className="repo-header">
          <div className="repo-title">
            <div className="repo-name">
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
              >
                {name}
                <ExternalLink size={14} />
              </a>
            </div>
            {description && (
              <div className="repo-description">{description}</div>
            )}
          </div>
          <div className="repo-stats">
            <div className="repo-stat">
              <Star size={14} />
              <span>{formatNumber(stargazers_count)}</span>
            </div>
            <div className="repo-stat">
              <GitFork size={14} />
              <span>{formatNumber(forks_count)}</span>
            </div>
          </div>
        </div>

        <div className="repo-meta">
          {language && (
            <div className="repo-language">
              <span
                className="language-dot"
                style={{ backgroundColor: getLanguageColor(language) }}
              />
              <span>{language}</span>
            </div>
          )}
          <div className="repo-stat">
            <Calendar size={14} />
            <span>Updated {formatDate(updated_at)}</span>
          </div>
        </div>

        {safeTopics.length > 0 && (
          <div className="repo-topics">
            {safeTopics.slice(0, 3).map((topic, index) => (
              <span key={`${id}-${topic}-${index}`} className="topic-tag">
                {topic}
              </span>
            ))}
            {safeTopics.length > 3 && (
              <span className="topic-more">+{safeTopics.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    );
  };

  export default RepositoryCard;