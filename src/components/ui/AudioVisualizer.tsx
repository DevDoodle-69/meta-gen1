
import React, { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlayToggle: () => void;
  className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioUrl, isPlaying, onPlayToggle, className = '' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setCurrentTime(0);
      onPlayToggle();
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl, onPlayToggle]);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className={`${className} glass p-3 rounded-xl`}>
      <div className="flex items-center justify-between w-full">
        <button 
          onClick={onPlayToggle}
          className="w-8 h-8 flex items-center justify-center bg-accent/20 hover:bg-accent/40 transition-colors rounded-full"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
          )}
        </button>
        
        <div className="flex-1 mx-3">
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-accent to-primary"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="text-xs text-white/70">
          {isLoaded ? `${formatTime(currentTime)} / ${formatTime(duration)}` : "Loading..."}
        </div>
      </div>
      
      <div className="mt-3 h-12 flex items-end justify-center space-x-0.5">
        {Array.from({ length: 16 }).map((_, index) => (
          <div 
            key={index} 
            className="audio-bar"
            style={{ 
              height: isPlaying ? `${Math.random() * 70 + 30}%` : '30%'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
