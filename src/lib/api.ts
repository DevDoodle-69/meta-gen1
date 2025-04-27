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
  status: 'pending' | 'done' | 'error';
  records: TaskRecord[];
}

export const generateMusic = async ({ title, lyrics, style }: GenerateMusicParams): Promise<GenerateMusicResponse> => {
  const url = `https://api.paxsenix.biz.id/ai-tools/suno?title=${encodeURIComponent(title)}&lyrics=${encodeURIComponent(lyrics)}&style=${encodeURIComponent(style)}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.jobId || !data.task_url) {
    throw new Error('Invalid response from music generation API, sir.');
  }
  
  return {
    jobId: data.jobId,
    task_url: data.task_url
  };
};

export const checkTaskStatus = async (taskUrl: string): Promise<TaskRecord[]> => {
  while (true) {
    const response = await fetch(taskUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Task status request failed with status ${response.status}`);
    }
    
    const taskData: TaskStatusResponse = await response.json();
    
    if (taskData.status === 'done') {
      if (Array.isArray(taskData.records) && taskData.records.length > 0) {
        return taskData.records.slice(0, 2); // only return first 2 songs
      } else {
        throw new Error('No records found in completed task, sir.');
      }
    }
    
    if (taskData.status === 'error') {
      throw new Error('Task processing failed on server side, sir.');
    }
    
    // Wait before next check
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
};

export const musicStyles = [
  "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", "Country", "Folk",
  "Metal", "Indie", "Ambient", "Blues", "Reggae", "Disco", "Funk", "Soul", "Techno",
  "House", "Dubstep", "80s Pop", "90s Hip Hop", "Lo-fi", "Trap"
];
