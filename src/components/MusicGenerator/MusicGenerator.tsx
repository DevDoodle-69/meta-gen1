
import React from 'react';
import { useMusic } from '@/hooks/useMusic';
import MusicForm from './MusicForm';
import GeneratedTrack from './GeneratedTrack';
import { Progress } from '@/components/ui/progress';

const MusicGenerator: React.FC = () => {
  const { isGenerating, progress, generatedTracks, generateTrack } = useMusic();

  const handleSubmit = ({ title, lyrics, style }: { title: string; lyrics: string; style: string }) => {
    generateTrack({ title, lyrics, style });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {!generatedTracks.length || isGenerating ? (
        <MusicForm onSubmit={handleSubmit} isLoading={isGenerating} />
      ) : (
        <GeneratedTrack track={generatedTracks[0]} />
      )}
      
      {isGenerating && (
        <div className="glass p-4 rounded-xl w-full max-w-2xl mx-auto animate-fade-in">
          <div className="text-center mb-3">
            <h3 className="text-sm font-medium text-white">Generating your music...</h3>
            <p className="text-xs text-white/60 mt-1">
              This may take a minute or two. We're crafting your masterpiece!
            </p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>Processing</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicGenerator;
