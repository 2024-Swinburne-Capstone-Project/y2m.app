import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Milestone } from '@/types';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface MilestoneProgressProps {
  milestones: Milestone[];
}

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
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: developmentHubConfig.milestoneProgress.IN_PROGRESS,
      value: progress.IN_PROGRESS,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: developmentHubConfig.milestoneProgress.NOT_STARTED,
      value: progress.NOT_STARTED,
      icon: Circle,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
    },
  ];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{developmentHubConfig.milestoneProgress.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow items-center justify-center">
        <div className="grid w-full grid-cols-3 gap-4">
          {milestoneData.map((data, index) => (
            <div key={index} className="text-center">
              <div
                className={`mx-auto flex size-12 items-center justify-center rounded-full ${data.bgColor}`}
              >
                <data.icon className={`size-6 ${data.color}`} />
              </div>
              <div className="mt-3 text-2xl font-semibold">{data.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{data.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneProgress;
