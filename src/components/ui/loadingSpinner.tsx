import { Loader2 } from "lucide-react";

const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };
  
    return <Loader2 className={`${sizeClasses[size]} animate-spin`} />;
  };

  export default LoadingSpinner;