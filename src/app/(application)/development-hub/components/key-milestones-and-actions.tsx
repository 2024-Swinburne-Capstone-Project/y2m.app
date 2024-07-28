import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { developmentHubConfig } from '@/config/application/development-hub';
import { MilestoneWithSteps } from '@/types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const statusConfig = {
  COMPLETED: { color: 'bg-green-500', icon: CheckCircle2 },
  IN_PROGRESS: { color: 'bg-blue-500', icon: Clock },
  NOT_STARTED: { color: 'bg-gray-300', icon: Circle },
};

const StatusIcon: React.FC<{ status: keyof typeof statusConfig }> = ({ status }) => {
  const { icon: Icon } = statusConfig[status];
  return <Icon className={`mr-2 size-4`} />;
};

const StepItem: React.FC<{ step: MilestoneWithSteps['steps'][number] }> = ({ step }) => (
  <div className="flex items-center py-1">
    <StatusIcon status={step.status as keyof typeof statusConfig} />
    <span className={step.status === 'COMPLETED' ? 'line-through' : ''}>{step.name}</span>
  </div>
);

const MilestoneItem: React.FC<{ milestone: MilestoneWithSteps }> = ({ milestone }) => (
  <AccordionItem value={milestone.id.toString()}>
    <AccordionTrigger className="hover:no-underline">
      <div className="flex w-full items-center justify-between">
        <span>{milestone.title}</span>
        <Badge variant={milestone.status === 'IN_PROGRESS' ? 'default' : 'secondary'}>
          {milestone.status}
        </Badge>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        {milestone.steps.map((step) => (
          <StepItem key={step.id.toString()} step={step} />
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
);

interface KeyMilestonesAndActionsProps {
  milestonesWithSteps: MilestoneWithSteps[];
}

const KeyMilestonesAndActions: React.FC<KeyMilestonesAndActionsProps> = ({
  milestonesWithSteps,
}) => {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.keyMilestones.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {milestonesWithSteps.map((milestone) => (
            <MilestoneItem key={milestone.id.toString()} milestone={milestone} />
          ))}
        </Accordion>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline">{developmentHubConfig.keyMilestones.exportButton}</Button>
          <Button>{developmentHubConfig.keyMilestones.addButton}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMilestonesAndActions;
