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
  Legend,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Milestone, MilestoneStep } from '@/types';

interface MilestoneTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{ name: string; value: number; fill: string }>;
}

const chartConfig = {
  notStarted: {
    label: 'Not Started',
    theme: {
      light: '#EF4444',
      dark: '#DC2626',
    },
  },
  inProgress: {
    label: 'In Progress',
    theme: {
      light: '#F59E0B',
      dark: '#D97706',
    },
  },
  completed: {
    label: 'Completed',
    theme: {
      light: '#10B981',
      dark: '#059669',
    },
  },
};

const MilestoneTooltip: React.FC<MilestoneTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const totalSteps = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div className="rounded-md border border-gray-200 bg-white p-3 shadow-lg">
        <p className="text-lg font-bold text-gray-800">{payload[0].payload.name}</p>
        <p className="text-gray-600">Total Steps: {totalSteps}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-gray-600" style={{ color: entry.fill }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface GraphicalTimelineProps {
  milestones: Milestone[];
  milestoneSteps: MilestoneStep[];
}

const GraphicalTimeline: React.FC<GraphicalTimelineProps> = ({ milestones, milestoneSteps }) => {
  const chartData = milestones.map((milestone) => {
    const steps = milestoneSteps.filter((step) => step.milestoneId === Number(milestone.id));
    return {
      name: milestone.title,
      notStarted: steps.filter((step) => step.status === 'NOT_STARTED').length,
      inProgress: steps.filter((step) => step.status === 'IN_PROGRESS').length,
      completed: steps.filter((step) => step.status === 'COMPLETED').length,
    };
  });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.graphicalTimeline.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 80, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip content={<MilestoneTooltip />} />
              <Legend />
              <Bar
                dataKey="notStarted"
                stackId="a"
                fill={chartConfig.notStarted.theme.light}
                name="Not Started"
              />
              <Bar
                dataKey="inProgress"
                stackId="a"
                fill={chartConfig.inProgress.theme.light}
                name="In Progress"
              />
              <Bar
                dataKey="completed"
                stackId="a"
                fill={chartConfig.completed.theme.light}
                name="Completed"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GraphicalTimeline;
