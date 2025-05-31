import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;  // <-- added disabled prop
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,   // <-- default false
}) => {
  const variantClasses = {
    primary: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500"
  };

  // Disabled styles override hover/focus and reduce opacity + disable pointer events
  const disabledClasses = "opacity-50 cursor-not-allowed hover:bg-none focus:ring-0";

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3"
  };

  const widthClass = fullWidth ? "w-full justify-center" : "inline-flex";

  const classes = `
    ${widthClass} items-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    ${disabled ? disabledClasses : variantClasses[variant]} 
    ${sizeClasses[size]}
  `;

  return (
    <button 
      type={type} 
      className={classes} 
      onClick={disabled ? undefined : onClick}  // ignore clicks if disabled
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
