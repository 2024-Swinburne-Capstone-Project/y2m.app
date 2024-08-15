import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Milestone, MilestoneStep } from '@/types';
import { Bar, BarChart, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface GraphicalTimelineProps {
  milestones: Milestone[];
  milestoneSteps: MilestoneStep[];
}

const GraphicalTimeline: React.FC<GraphicalTimelineProps> = ({ milestones, milestoneSteps }) => {
  const chartData = milestones.map((milestone) => {
    const steps = milestoneSteps.filter((step) => step.milestoneId === Number(milestone.id));
    const completedSteps = steps.filter((step) => step.status === 'COMPLETED').length;
    const inProgressSteps = steps.filter((step) => step.status === 'IN_PROGRESS').length;
    const notStartedSteps = steps.filter((step) => step.status === 'NOT_STARTED').length;

    return {
      name: milestone.title,
      Completed: completedSteps,
      'In-Progress': inProgressSteps,
      'Not-Started': notStartedSteps,
    };
  });

  const chartConfig = {
    Completed: {
      label: 'Completed',
      color: 'hsl(var(--chart-1))',
    },
    'In-Progress': {
      label: 'In Progress',
      color: 'hsl(var(--chart-2))',
    },
    'Not-Started': {
      label: 'Not Started',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.graphicalTimeline.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="Completed" fill="var(--color-Completed)" radius={4} />
            <Bar dataKey="In-Progress" fill="var(--color-In-Progress)" radius={4} />
            <Bar dataKey="Not-Started" fill="var(--color-Not-Started)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GraphicalTimeline;
