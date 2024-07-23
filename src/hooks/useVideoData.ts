import { useQuery } from '@tanstack/react-query';
import { VideoConfig } from '@/types';

const fetchVideos = async (): Promise<VideoConfig[]> => {
  const response = await fetch('/api/videos');
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  const data = await response.json();
  return data.map((video: VideoConfig) => ({
    id: video.id,
    title: {
      text: video.title,
    },
    description: {
      text: video.description,
    },
    embeddingLink: video.embeddingLink,
    videoLength: video.videoLength,
  }));
};

export const useVideos = () => {
  return useQuery<VideoConfig[], Error>({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });
};

const fetchVideo = async (id: string): Promise<VideoConfig> => {
  const response = await fetch(`/api/videos/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch video');
  }
  const video = await response.json();
  return {
    id: video.id,
    title: {
      text: video.title,
    },
    description: {
      text: video.description,
    },
    embeddingLink: video.embeddingLink,
    videoLength: video.videoLength,
  };
};

export const useVideo = (id: string) => {
  return useQuery<VideoConfig, Error>({
    queryKey: ['video', id],
    queryFn: () => fetchVideo(id),
    enabled: !!id,
  });
};
