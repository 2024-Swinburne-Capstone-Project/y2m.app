import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Milestone } from '@/types';

interface MilestoneCardProps {
  title: string;
  value: number;
  color: string;
}

interface MilestoneProgressProps {
  milestones: Milestone[];
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ title, value, color }) => (
  <Card>
    <CardContent className="flex flex-col items-center justify-center p-6">
      <div
        className={`text-4xl font-bold ${color} mb-4 flex size-16 items-center justify-center rounded-full text-white`}
      >
        {value}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </CardContent>
  </Card>
);

const MilestoneProgress: React.FC<MilestoneProgressProps> = ({ milestones }) => {
  const progress = milestones.reduce(
    (acc, milestone) => {
      acc[milestone.status]++;
      return acc;
    },
    { COMPLETED: 0, IN_PROGRESS: 0, NOT_STARTED: 0 }
  );

  const milestoneData = [
    {
      title: developmentHubConfig.milestoneProgress.COMPLETED,
      value: progress.COMPLETED,
      color: 'bg-green-500',
    },
    {
      title: developmentHubConfig.milestoneProgress.IN_PROGRESS,
      value: progress.IN_PROGRESS,
      color: 'bg-blue-500',
    },
    {
      title: developmentHubConfig.milestoneProgress.NOT_STARTED,
      value: progress.NOT_STARTED,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-3">
      {milestoneData.map((milestone, index) => (
        <MilestoneCard key={index} {...milestone} />
      ))}
    </div>
  );
};

export default MilestoneProgress;
