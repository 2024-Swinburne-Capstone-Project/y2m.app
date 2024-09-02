import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from '@/types';
import { MediaRelease } from '@/types/db';
import { CreateMediaReleaseData } from '@/types/media-release/media-release';

const fetchMediaReleases = async (): Promise<MediaRelease[]> => {
  const response = await fetch('/api/media-centre');
  if (!response.ok) {
    throw new Error('Failed to fetch media releases');
  }
  const apiResponse: ApiResponse<MediaRelease[]> = await response.json();
  return apiResponse.data;
};

export const useMediaReleases = () => {
  return useQuery({
    queryKey: ['mediaReleases'],
    queryFn: fetchMediaReleases,
  });
};

const createMediaRelease = async (data: CreateMediaReleaseData): Promise<MediaRelease> => {
  const response = await fetch('/api/media-centre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create media release');
  }

  const apiResponse: ApiResponse<MediaRelease> = await response.json();
  return apiResponse.data;
};

export const useCreateMediaRelease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMediaRelease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaRelease'] });
    },
  });
};
