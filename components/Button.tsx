
import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary',
    secondary: 'bg-brand-secondary text-white hover:bg-opacity-90 focus:ring-brand-secondary',
    outline: 'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
