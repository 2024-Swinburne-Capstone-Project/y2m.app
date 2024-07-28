import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  CartesianGrid,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { developmentHubConfig } from '@/config/application/development-hub';
import { MilestoneWithSteps } from '@/types';

interface MilestoneTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{ payload: MilestoneWithSteps }>;
}

const chartConfig = {
  duration: {
    label: 'Duration',
    theme: {
      light: '#818cf8',
      dark: '#6366f1',
    },
  },
};

const MilestoneTooltip: React.FC<MilestoneTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { title, status, steps } = payload[0].payload;
    return (
      <div className="rounded-md border border-gray-200 bg-white p-3 shadow-lg">
        <p className="text-lg font-bold">{title}</p>
        <p>Status: {status}</p>
        <p>Steps: {steps.length}</p>
      </div>
    );
  }
  return null;
};

interface GraphicalTimelineProps {
  milestones: MilestoneWithSteps[];
}

const GraphicalTimeline: React.FC<GraphicalTimelineProps> = ({ milestones }) => {
  const chartData = milestones.map((milestone, index) => ({
    name: milestone.title,
    start: index,
    duration: 1,
    ...milestone,
  }));

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.graphicalTimeline.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 50, left: 5, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" type="category" angle={-45} textAnchor="end" interval={0} />
              <YAxis type="number" />
              <Tooltip content={<MilestoneTooltip />} />
              <Bar dataKey="duration" fill="var(--color-duration)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GraphicalTimeline;
