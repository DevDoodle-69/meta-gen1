
import React from 'react';
import Layout from '@/components/Layout/Layout';
import MusicGenerator from '@/components/MusicGenerator/MusicGenerator';
import { Sparkles, Music, Zap } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="opacity-0 animate-slide-up animate-delay-100 inline-block mb-3">
            <div className="bg-accent/20 text-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium inline-flex items-center space-x-1">
              <Sparkles size={14} />
              <span>AI-Powered Music Generation</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-slide-up animate-delay-200">
            <span className="text-gradient">Turn Your Words Into</span>
            <br />
            <span className="text-gradient-purple glow-text">Beautiful Music</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 opacity-0 animate-slide-up animate-delay-300">
            MeTa-Gen1 uses advanced AI to transform your lyrics and ideas into fully-realized songs in any style you can imagine.
          </p>
          
          <MusicGenerator />
        </div>
      </section>
      
      <section id="about" className="py-16 md:py-24 bg-metal-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              How It Works
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Creating music with MeTa-Gen1 is simple, fast, and magical
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass p-6 rounded-xl text-center opacity-0 animate-fade-in animate-delay-100">
              <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">1. Write Lyrics</h3>
              <p className="text-white/70">
                Enter your song title, write your lyrics, and choose a musical style
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl text-center opacity-0 animate-fade-in animate-delay-200">
              <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">2. Generate</h3>
              <p className="text-white/70">
                Our AI works its magic, crafting a complete song based on your input
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl text-center opacity-0 animate-fade-in animate-delay-300">
              <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">3. Enjoy & Share</h3>
              <p className="text-white/70">
                Listen to your creation, download it, and share it with the world
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
