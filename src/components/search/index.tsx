import { Loader2, Search } from "lucide-react";
const SearchForm: React.FC<{
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  loading: boolean;
}> = ({ query, onQueryChange, onSearch, loading }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="card" data-testid="loading-spinner">
      <div className="card-padding">
        <div className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter GitHub username (e.g., facebook, microsoft, google)"
            disabled={loading}
            className="search-input"
          />
          <button
            onClick={onSearch}
            disabled={loading || !query.trim()}
            className="btn btn-primary"
          >
            {loading ? (
              <Loader2 size={16} className="spin" />
            ) : (
              <Search size={16} />
            )}
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

  export default SearchForm;