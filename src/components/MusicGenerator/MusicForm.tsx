
import React, { useState } from 'react';
import { Music, Sparkles } from 'lucide-react';
import { musicStyles } from '@/lib/api';
import CustomButton from '@/components/ui/CustomButton';

interface MusicFormProps {
  onSubmit: (data: { title: string; lyrics: string; style: string }) => void;
  isLoading: boolean;
}

const MusicForm: React.FC<MusicFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [style, setStyle] = useState('Pop');
  const [formErrors, setFormErrors] = useState({
    title: false,
    lyrics: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors = {
      title: !title.trim(),
      lyrics: !lyrics.trim(),
    };
    
    setFormErrors(errors);
    
    if (!errors.title && !errors.lyrics) {
      onSubmit({ title, lyrics, style });
    }
  };

  return (
    <div className="glass p-6 rounded-2xl w-full max-w-2xl mx-auto opacity-0 animate-scale-in">
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Music size={18} className="text-accent" />
          <h2 className="text-lg font-semibold text-gradient">Create Your Music</h2>
        </div>
        <p className="text-center text-sm text-white/60">
          Fill in the details below to generate your custom AI music track
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="title" className="block text-sm font-medium text-white/80">
            Track Title
          </label>
          <div className="input-highlight">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your track..."
              className={`w-full bg-secondary/40 backdrop-blur-sm rounded-lg px-4 py-3 border ${
                formErrors.title ? 'border-destructive' : 'border-transparent'
              } focus:outline-none focus:ring-1 focus:ring-accent transition-all`}
            />
          </div>
          {formErrors.title && (
            <p className="text-xs text-destructive mt-1">Please enter a title</p>
          )}
        </div>
        
        <div className="space-y-1">
          <label htmlFor="lyrics" className="block text-sm font-medium text-white/80">
            Lyrics
          </label>
          <div className="input-highlight">
            <textarea
              id="lyrics"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Write your lyrics here..."
              rows={5}
              className={`w-full bg-secondary/40 backdrop-blur-sm rounded-lg px-4 py-3 border ${
                formErrors.lyrics ? 'border-destructive' : 'border-transparent'
              } focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none`}
            />
          </div>
          {formErrors.lyrics && (
            <p className="text-xs text-destructive mt-1">Please enter some lyrics</p>
          )}
        </div>
        
        <div className="space-y-1">
          <label htmlFor="style" className="block text-sm font-medium text-white/80">
            Music Style
          </label>
          <div className="input-highlight">
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-secondary/40 backdrop-blur-sm rounded-lg px-4 py-3 border border-transparent focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5em'
              }}
            >
              {musicStyles.map((musicStyle) => (
                <option key={musicStyle} value={musicStyle}>
                  {musicStyle}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="pt-2">
          <CustomButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            icon={<Sparkles size={16} />}
          >
            Generate Music
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default MusicForm;
