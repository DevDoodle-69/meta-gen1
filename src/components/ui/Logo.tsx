
import React from 'react';
import { Music4 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-30 animate-pulse-subtle"></div>
        <div className="relative bg-gradient-to-br from-accent to-primary p-2 rounded-full">
          <Music4 className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
        </div>
      </div>
      <div className={`font-semibold tracking-tight ${sizes[size]} text-gradient-purple`}>
        MeTa-Gen<span className="text-white">1</span>
      </div>
    </div>
  );
};

export default Logo;
