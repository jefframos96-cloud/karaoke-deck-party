import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'magic';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-cyan-500/50",
    secondary: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-red-500/50",
    magic: "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white animate-pulse hover:shadow-pink-500/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};