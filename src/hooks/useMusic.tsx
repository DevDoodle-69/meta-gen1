
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateMusic, checkTaskStatus } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface TaskRecord {
  audio_url: string;
  image_url: string;
  title: string;
  lyrics: string;
  style: string;
}

interface MusicGeneratorParams {
  title: string;
  lyrics: string;
  style: string;
}

export function useMusic() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<TaskRecord[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const generateTrack = useCallback(async ({ title, lyrics, style }: MusicGeneratorParams) => {
    try {
      setIsGenerating(true);
      setProgress(0);
      
      // Generate the music and get the job ID
      const { jobId, task_url } = await generateMusic({ title, lyrics, style });
      setCurrentJobId(jobId);
      
      toast({
        title: "Music generation started",
        description: `Your track "${title}" is being created. This may take a minute or two.`,
      });
      
      // Artificial progress to show something is happening
      let artificialProgress = 0;
      
      intervalRef.current = window.setInterval(() => {
        if (artificialProgress < 90) {
          artificialProgress += Math.random() * 3;
          setProgress(Math.min(artificialProgress, 90));
        }
      }, 1000) as unknown as number;
      
      // Poll the task status until it's done
      let taskStatus = '';
      let taskData = null;
      
      while (taskStatus !== 'done') {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const taskResponse = await checkTaskStatus(task_url);
        taskData = taskResponse;
        taskStatus = taskResponse.status;
      }
      
      // Clear the interval and set progress to 100%
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      setProgress(100);
      
      if (taskData && taskData.records) {
        setGeneratedTracks(taskData.records);
        
        toast({
          title: "Music generated successfully!",
          description: `Your track "${title}" is ready to play.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error generating music",
        description: "There was a problem generating your music. Please try again.",
        variant: "destructive",
      });
      console.error('Error in generateTrack:', error);
    } finally {
      setIsGenerating(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [toast]);

  return {
    isGenerating,
    progress,
    currentJobId,
    generatedTracks,
    generateTrack,
  };
}
