import React, { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import { Facebook, Instagram, Menu, Star, X, Music, MessageSquare, Globe, Briefcase } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialLinks = [
    { 
      name: 'Facebook',
      url: 'https://www.facebook.com/share/19Pen6RLiM/?mibextid=qi2Omg',
      icon: Facebook 
    },
    { 
      name: 'Instagram',
      url: 'https://www.instagram.com/__selfish__nzr?igsh=Z3djOXh6NGZ2cmYy',
      icon: Instagram 
    },
    { 
      name: 'Discord',
      url: 'https://discord.gg/47DbSUvc',
      icon: MessageSquare 
    },
    {
      name: 'Portfolio',
      url: 'https://portfolio-of-nzr.onrender.com',
      icon: Briefcase
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <header className="glass sticky top-0 z-50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</a>
            <a 
              href="https://portfolio-of-nzr.onrender.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <Briefcase size={16} />
              <span>Portfolio</span>
            </a>
          </nav>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 max-w-md border-white/10 bg-black/80 backdrop-blur-xl text-white">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col items-center space-y-4 py-8">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-primary blur-sm opacity-70"></div>
                      <Avatar className="w-28 h-28 border-2 border-primary">
                        <AvatarImage src="https://i.ibb.co/Kwj22F4/image.jpg" alt="Creator" />
                        <AvatarFallback className="bg-black text-white">NZR</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">NZ R</h3>
                      <p className="text-sm text-white/60">Code Ninja & AI Explorer</p>
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-2">
                      {[1, 2, 3].map((star) => (
                        <Star 
                          key={star} 
                          className="text-yellow-400 fill-yellow-400" 
                          size={16} 
                        />
                      ))}
                      <Star
                        className="text-yellow-400 fill-yellow-400" 
                        size={16}
                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                      />
                      <Star 
                        className="text-yellow-400/30" 
                        size={16} 
                      />
                      <span className="ml-2 text-sm font-medium">3.5</span>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="py-4 px-2">
                    <p className="text-sm text-white/80 leading-relaxed">
                      Yo.! your NZ R here..! 🤤. Living the dev life, turning coffee into code, and making AI do cool stuff. Currently vibing with MeTa-Gen1 - my baby project that turns random thoughts into music. Sometimes it works like magic, sometimes... well, let's just say we're still learning 😅 Check out my portfolio if you wanna see what else I'm cooking up..! ✨
                    </p>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="py-4">
                    <div className="space-y-3">
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Music size={18} />
                        <span>Music Generator</span>
                      </a>
                      <a 
                        href="#about" 
                        className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <MessageSquare size={18} />
                        <span>About</span>
                      </a>
                      <a 
                        href="https://portfolio-of-nzr.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Briefcase size={18} />
                        <span>Portfolio</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Separator className="bg-white/10 mb-4" />
                    
                    <div className="flex justify-center space-x-4 py-4">
                      {socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                          aria-label={link.name}
                        >
                          <link.icon size={20} className="text-white/90" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="glass border-t border-white/5 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo size="sm" />
            </div>
            
            <div className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} MeTa-Gen1. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
