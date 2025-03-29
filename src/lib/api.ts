
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

const generateMusic = async ({ title, lyrics, style }: GenerateMusicParams): Promise<GenerateMusicResponse> => {
  const url = `https://api.paxsenix.biz.id/tools/suno?title=${encodeURIComponent(title)}&lyrics=${encodeURIComponent(lyrics)}&style=${encodeURIComponent(style)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error generating music:', error);
    throw error;
  }
};

const checkTaskStatus = async (taskUrl: string): Promise<TaskStatusResponse> => {
  try {
    const response = await fetch(taskUrl);
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error checking task status:', error);
    throw error;
  }
};

export const generateTwoSongs = async (params1: GenerateMusicParams, params2: GenerateMusicParams) => {
  try {
    const [song1Response, song2Response] = await Promise.all([generateMusic(params1), generateMusic(params2)]);
    const [song1Data, song2Data] = await Promise.all([pollTaskUntilDone(song1Response.task_url), pollTaskUntilDone(song2Response.task_url)]);
    return [song1Data.records[0], song2Data.records[0]];
  } catch (error) {
    console.error('Error generating or retrieving songs:', error);
    throw error;
  }
};

const pollTaskUntilDone = async (taskUrl: string, interval: number = 5000): Promise<TaskStatusResponse> => {
  let taskStatus: string;
  let taskData: TaskStatusResponse;
  do {
    await new Promise(resolve => setTimeout(resolve, interval));
    taskData = await checkTaskStatus(taskUrl);
    taskStatus = taskData.status;
  } while (taskStatus !== "done");
  return taskData;
};

export const musicStyles = [
  "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", "Country", "Folk",
  "Metal", "Indie", "Ambient", "Blues", "Reggae", "Disco", "Funk", "Soul", "Techno", "House",
  "Dubstep", "80s Pop", "90s Hip Hop", "Lo-fi", "Trap"
];
