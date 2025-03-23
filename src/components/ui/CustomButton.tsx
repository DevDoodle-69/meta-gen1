
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', icon, isLoading, ...props }, ref) => {
    const baseStyles = "relative font-medium rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none button-glow";
    
    const variants = {
      primary: "bg-gradient-to-r from-accent to-primary text-white shadow-button hover:shadow-lg hover:translate-y-[-2px]",
      secondary: "bg-secondary/80 text-white backdrop-blur-sm hover:bg-secondary hover:shadow-lg hover:translate-y-[-2px]",
      outline: "bg-transparent border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary",
      ghost: "bg-transparent text-foreground hover:bg-primary/5"
    };
    
    const sizes = {
      sm: "text-xs px-3 py-1.5 space-x-1.5",
      md: "text-sm px-5 py-2.5 space-x-2",
      lg: "text-base px-7 py-3 space-x-3"
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "opacity-80 pointer-events-none",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {children && <span>{children}</span>}
          </>
        )}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
