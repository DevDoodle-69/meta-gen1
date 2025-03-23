
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

export const generateMusic = async ({ title, lyrics, style }: GenerateMusicParams): Promise<GenerateMusicResponse> => {
  const url = `https://api.paxsenix.biz.id/tools/suno?title=${encodeURIComponent(title)}&lyrics=${encodeURIComponent(lyrics)}&style=${encodeURIComponent(style)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error generating music:', error);
    throw error;
  }
};

export const checkTaskStatus = async (taskUrl: string): Promise<TaskStatusResponse> => {
  try {
    const response = await fetch(taskUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking task status:', error);
    throw error;
  }
};

// This is just a sample list of styles that Suno AI supports
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
