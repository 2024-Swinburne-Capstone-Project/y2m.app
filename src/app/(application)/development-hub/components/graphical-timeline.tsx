import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Milestone, MilestoneStep } from '@/types';
import DevelopmentChart from '../../../../components/application/development-chart';

interface GraphicalTimelineProps {
  title: string;
  milestones: Milestone[];
  milestoneSteps: MilestoneStep[];
}

const GraphicalTimeline: React.FC<GraphicalTimelineProps> = ({
  title,
  milestones,
  milestoneSteps,
}) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DevelopmentChart milestones={milestones} milestoneSteps={milestoneSteps} />
      </CardContent>
    </Card>
  );
};

export default GraphicalTimeline;
