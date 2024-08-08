import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Milestone, MilestoneStep } from '@/types';

interface MilestoneTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    payload: {
      name: string;
      completed: number;
      inProgress: number;
      notStarted: number;
      total: number;
      status: string;
    };
  }>;
}

const chartConfig = {
  completed: {
    label: 'Completed',
    theme: {
      light: '#10B981',
      dark: '#059669',
    },
  },
  inProgress: {
    label: 'In Progress',
    theme: {
      light: '#60A5FA',
      dark: '#3B82F6',
    },
  },
  notStarted: {
    label: 'Not Started',
    theme: {
      light: '#9CA3AF',
      dark: '#6B7280',
    },
  },
};

const MilestoneTooltip: React.FC<MilestoneTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border border-gray-200 bg-white p-3 shadow-lg">
        <p className="text-lg font-bold text-gray-800">{data.name}</p>
        <p className="text-gray-600">Status: {data.status}</p>
        <p className="text-gray-600">
          Completed: {data.completed} / {data.total}
        </p>
        <p className="text-gray-600">
          In Progress: {data.inProgress} / {data.total}
        </p>
        <p className="text-gray-600">
          Not Started: {data.notStarted} / {data.total}
        </p>
        <p className="text-gray-600">
          Progress: {Math.round(((data.completed + data.inProgress) / data.total) * 100)}%
        </p>
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
    const completedSteps = steps.filter((step) => step.status === 'COMPLETED').length;
    const inProgressSteps = steps.filter((step) => step.status === 'IN_PROGRESS').length;
    const notStartedSteps = steps.filter((step) => step.status === 'NOT_STARTED').length;
    const totalSteps = steps.length;

    return {
      name: milestone.title,
      completed: completedSteps,
      inProgress: inProgressSteps,
      notStarted: notStartedSteps,
      total: totalSteps,
      status: milestone.status,
    };
  });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.graphicalTimeline.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={50 * chartData.length + 100}>
            <ComposedChart
              layout="vertical"
              data={chartData}
              margin={{ top: 20, right: 80, bottom: 20, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" domain={[0, 'dataMax']} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip content={<MilestoneTooltip />} />
              <Legend />
              <Bar
                dataKey="completed"
                stackId="a"
                fill={chartConfig.completed.theme.light}
                name="Completed"
              />
              <Bar
                dataKey="inProgress"
                stackId="a"
                fill={chartConfig.inProgress.theme.light}
                name="In Progress"
              />
              <Bar
                dataKey="notStarted"
                stackId="a"
                fill={chartConfig.notStarted.theme.light}
                name="Not Started"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GraphicalTimeline;
