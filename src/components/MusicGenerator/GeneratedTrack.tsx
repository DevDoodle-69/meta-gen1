
import React, { useState } from 'react';
import { Download, Music4 } from 'lucide-react';
import AudioVisualizer from '@/components/ui/AudioVisualizer';
import CustomButton from '@/components/ui/CustomButton';

interface GeneratedTrackProps {
  track: {
    audio_url: string;
    image_url: string;
    title: string;
    lyrics: string;
    style: string;
  };
}

const GeneratedTrack: React.FC<GeneratedTrackProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="animate-slide-in w-full max-w-2xl mx-auto opacity-0">
      <div className="glass rounded-2xl overflow-hidden">
        <div className="relative">
          <div className={`w-full aspect-video bg-accent/10 ${!isImageLoaded ? 'animate-pulse' : ''}`}>
            <img
              src={track.image_url}
              alt={track.title}
              onLoad={() => setIsImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <Music4 size={12} />
              <span>{track.style}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1 text-gradient">{track.title}</h2>
            <p className="text-sm text-white/60">
              Generated with MeTa-Gen1
            </p>
          </div>
          
          <div className="mb-5">
            <h3 className="text-sm font-medium text-white/80 mb-2">Lyrics</h3>
            <div className="bg-black/20 rounded-lg p-3 max-h-32 overflow-y-auto text-sm text-white/70 whitespace-pre-line">
              {track.lyrics}
            </div>
          </div>
          
          <AudioVisualizer
            audioUrl={track.audio_url}
            isPlaying={isPlaying}
            onPlayToggle={togglePlay}
            className="mb-4"
          />
          
          <CustomButton
            variant="outline"
            size="md"
            className="w-full"
            onClick={() => window.open(track.audio_url, '_blank')}
            icon={<Download size={16} />}
          >
            Download Track
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default GeneratedTrack;
