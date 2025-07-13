interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
  }
  
  const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
    const hoverClasses = hoverable ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' : '';
    
    return (
      <div
        onClick={onClick}
        className={`bg-white border border-gray-200 rounded-lg shadow-sm transition-all ${hoverClasses} ${className}`}
      >
        {children}
      </div>
    );
  };

  export default Card;