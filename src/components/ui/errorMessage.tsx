import { AlertCircle } from "lucide-react";
import Card from "./cards";
import Button from "./button";

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p>{message}</p>
            {onRetry && (
              <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
                Try Again
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };
  
  export default ErrorMessage;