import { Search } from "lucide-react";
import Button from "../ui/button";
import Card from "../ui/cards";
import Input from "../ui/input";
import LoadingSpinner from "../ui/loadingSpinner";

interface SearchFormProps {
    query: string;
    onQueryChange: (query: string) => void;
    onSearch: () => void;
    loading: boolean;
  }
  
  const SearchForm: React.FC<SearchFormProps> = ({ query, onQueryChange, onSearch, loading }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    };
  
    return (
      <Card className="p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              value={query}
              onChange={onQueryChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter GitHub username (e.g., facebook, microsoft, google)"
              disabled={loading}
            />
          </div>
          <Button
            onClick={onSearch}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2"
          >
            {loading ? <LoadingSpinner size="sm" /> : <Search className="w-4 h-4" />}
            Search
          </Button>
        </div>
      </Card>
    );
  };

  export default SearchForm;