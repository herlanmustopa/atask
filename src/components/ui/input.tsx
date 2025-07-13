interface InputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
  }
  
  const Input: React.FC<InputProps> = ({
    value,
    onChange,
    onKeyDown,
    placeholder,
    disabled = false,
    className = '',
  }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      />
    );
  };

  export default Input;