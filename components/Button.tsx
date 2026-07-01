import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const variantClass = variant === 'outline' ? 'outline-button' : variant === 'secondary' ? 'danger-button' : 'solid-button';
  return <button className={`${variantClass} ${className}`} {...props}>{children}</button>;
};

export default Button;
