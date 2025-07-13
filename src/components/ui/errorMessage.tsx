import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
      <div className="error-container">
        <AlertCircle size={20} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0 }}>{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn btn-secondary"
              style={{ marginTop: "0.5rem" }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default ErrorMessage;