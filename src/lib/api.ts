interface GenerateMusicParams {
  title: string;
  lyrics: string;
  style: string;
}

interface GenerateMusicResponse {
  jobId: string;
  task_url: string;
}

interface TaskRecord {
  audio_url: string;
  image_url: string;
  title: string;
  lyrics: string;
  style: string;
}

interface TaskStatusResponse {
  status: string;
  records: TaskRecord[];
}

export const generateMusic = async ({ title, lyrics, style }: GenerateMusicParams): Promise<GenerateMusicResponse[]> => {
  const baseUrl = 'https://api.paxsenix.biz.id/tools/suno';
  const requests = Array(2).fill(null).map(async () => {
    const url = `${baseUrl}?title=${encodeURIComponent(title)}&lyrics=${encodeURIComponent(lyrics)}&style=${encodeURIComponent(style)}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  });

  return Promise.all(requests);
};

export const checkTaskStatus = async (taskUrls: string[]): Promise<TaskStatusResponse[]> => {
  const requests = taskUrls.map(async (taskUrl) => {
    try {
      const response = await fetch(taskUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  });

  return Promise.all(requests);
};

export const processMusicGeneration = async ({ title, lyrics, style }: GenerateMusicParams): Promise<TaskRecord[]> => {
  try {
    const generationResponses = await generateMusic({ title, lyrics, style });
    const taskUrls = generationResponses.map(response => response.task_url);
    
    let allRecords: TaskRecord[] = [];
    let allCompleted = false;

    while (!allCompleted) {
      const statusResponses = await checkTaskStatus(taskUrls);
      allCompleted = statusResponses.every(response => response.status === 'completed');
      
      if (allCompleted) {
        allRecords = statusResponses.flatMap(response => response.records);
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return allRecords;
  } catch (error) {
    throw error;
  }
};

export const musicStyles = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Classical",
  "Country",
  "Folk",
  "Metal",
  "Indie",
  "Ambient",
  "Blues",
  "Reggae",
  "Disco",
  "Funk",
  "Soul",
  "Techno",
  "House",
  "Dubstep",
  "80s Pop",
  "90s Hip Hop",
  "Lo-fi",
  "Trap"
];

export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let currentRetry = 0;
  
  while (currentRetry < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      if (currentRetry === maxRetries - 1) throw error;
      
      await new Promise(resolve => 
        setTimeout(resolve, initialDelay * Math.pow(2, currentRetry))
      );
      currentRetry++;
    }
  }
  
  throw new Error('Max retries reached');
};

export const generateMusicWithRetry = async (params: GenerateMusicParams): Promise<TaskRecord[]> => {
  return retryWithBackoff(() => processMusicGeneration(params));
};
