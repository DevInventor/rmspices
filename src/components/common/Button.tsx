import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonComponent: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  href,
  type = 'button',
}) => {
  const baseStyles = 'flex items-center justify-center rounded-lg font-bold leading-normal tracking-[0.015em] cursor-pointer overflow-hidden transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-spice-100 dark:bg-slate-800 text-spice-500 dark:text-white hover:bg-spice-200 dark:hover:bg-slate-700',
    outline: 'border border-spice-200 dark:border-slate-700 text-spice-500 dark:text-white hover:bg-spice-100 dark:hover:bg-slate-800',
    ghost: 'text-spice-500 dark:text-white hover:bg-spice-100 dark:hover:bg-slate-800',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };
  
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );
  
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Memoize component for performance
export const Button = React.memo(ButtonComponent);

