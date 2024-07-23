import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  CreateDevelopmentAreaData,
  DevelopmentArea,
  DevelopmentHubData,
  MilestoneProgress,
  MilestoneWithSteps,
} from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const headers: HeadersInit = user?.sub ? { 'X-User-Id': user.sub } : {};
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchData();
  }, [url, user]);

  return { data, isLoading, error };
};

const useApiMutation = <T, TData>(key: string, endpoint: string) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  return useMutation<T, Error, TData>({
    mutationFn: async (data: TData) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.sub ? { 'X-User-Id': user.sub } : {}),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to create ${key}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};

const calculateMilestoneProgress = (milestones: MilestoneWithSteps[]): MilestoneProgress => {
  return milestones.reduce(
    (acc, milestone) => {
      acc[milestone.status as keyof MilestoneProgress]++;
      return acc;
    },
    { COMPLETED: 0, IN_PROGRESS: 0, NOT_STARTED: 0 }
  );
};

export const useCreateDevelopmentArea = () =>
  useApiMutation<DevelopmentArea, CreateDevelopmentAreaData>(
    'developmentAreas',
    '/api/development-areas'
  );

export const useDevelopmentHub = () => {
  const { data, isLoading, error } = useFetch<DevelopmentHubData>('/api/development-hub');

  console.table(data);
  const milestonesWithSteps =
    data?.milestones.map((milestone) => ({
      ...milestone,
      steps: data.milestoneSteps.filter((step) => step.milestoneId === Number(milestone.id)),
    })) ?? [];

  const milestoneProgress = calculateMilestoneProgress(milestonesWithSteps);

  return {
    milestonesWithSteps,
    developmentAreas: data?.developmentAreas ?? [],
    badges: data?.badges ?? [],
    milestoneProgress,
    isLoading,
    error,
  };
};
