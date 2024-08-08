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
import { CheckCircle2, Circle, Clock, MoreVertical, Trash2 } from 'lucide-react';
import { Milestone, MilestoneStep } from '@/types';
import AddMilestone from './add-milestone';
import AddMilestoneStep from './add-milestone-step';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RemoveButton from '@/components/common/remove-button';

type MilestoneStatus = 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';

const STATUS_CONFIG = {
  COMPLETED: { color: 'bg-green-500', icon: CheckCircle2 },
  IN_PROGRESS: { color: 'bg-blue-500', icon: Clock },
  NOT_STARTED: { color: 'bg-gray-300', icon: Circle },
};

const StatusIcon: React.FC<{ status: MilestoneStatus }> = ({ status }) => {
  const Icon = STATUS_CONFIG[status].icon;
  return <Icon className="mr-2 size-4" />;
};

interface KeyMilestonesAndActionsProps {
  milestones: Milestone[];
  milestoneSteps: MilestoneStep[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
  setMilestoneSteps: React.Dispatch<React.SetStateAction<MilestoneStep[]>>;
}

const KeyMilestonesAndActions: React.FC<KeyMilestonesAndActionsProps> = ({
  milestones,
  milestoneSteps,
  setMilestones,
  setMilestoneSteps,
}) => {
  const updateMilestone = (milestoneId: number, updates: Partial<Milestone>) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        Number(milestone.id) === milestoneId ? { ...milestone, ...updates } : milestone
      )
    );
  };

  const updateStep = (stepIndex: number, updates: Partial<MilestoneStep>) => {
    setMilestoneSteps((prevSteps) =>
      prevSteps.map((step, index) => (index === stepIndex ? { ...step, ...updates } : step))
    );
  };

  const removeMilestone = (milestoneId: number) => {
    setMilestones((prevMilestones) =>
      prevMilestones.filter((milestone) => Number(milestone.id) !== milestoneId)
    );
    setMilestoneSteps((prevSteps) => prevSteps.filter((step) => step.milestoneId !== milestoneId));
  };

  const removeStep = (stepIndex: number) => {
    setMilestoneSteps((prevSteps) => prevSteps.filter((step, index) => !(index === stepIndex)));
  };

  return (
    <Card className="my-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{developmentHubConfig.keyMilestones.title}</CardTitle>
        <AddMilestone setMilestones={setMilestones} />
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {milestones.map((milestone) => (
            <AccordionItem
              key={`milestone-${milestone.id}`}
              value={milestone.id?.toString()}
              className="overflow-hidden rounded-lg border"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-accent hover:no-underline">
                <div className="flex w-full items-center justify-between">
                  <span className="font-medium">{milestone.title}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={milestone.status === 'IN_PROGRESS' ? 'default' : 'secondary'}>
                      {milestone.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => removeMilestone(Number(milestone.id))}>
                          <Trash2 className="mr-2 size-4" />
                          Remove Milestone
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="space-y-3">
                  {milestoneSteps
                    .map((step, index) => ({ ...step, originalIndex: index }))
                    .filter((step) => step.milestoneId === Number(milestone.id))
                    .map((step) => (
                      <div
                        key={`step-${milestone.id}-${step.originalIndex}`}
                        className="flex items-center justify-between rounded-md px-3 py-2 text-accent-foreground transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <StatusIcon status={step.status} />
                          <span className={step.status === 'COMPLETED' ? 'line-through' : ''}>
                            {step.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={step.status}
                            onChange={(e) =>
                              updateStep(step.originalIndex, {
                                status: e.target.value as MilestoneStatus,
                              })
                            }
                            className="rounded border border-gray-300 p-1 text-sm"
                          >
                            <option value="NOT_STARTED">Not Started</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                          <RemoveButton
                            onRemove={() => removeStep(step.originalIndex)}
                            tooltipContent="Remove Step"
                            showDropdown={false}
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <select
                    value={milestone.status}
                    onChange={(e) =>
                      updateMilestone(Number(milestone.id), {
                        status: e.target.value as MilestoneStatus,
                      })
                    }
                    className="rounded border border-gray-300 p-2 text-sm"
                  >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                  <AddMilestoneStep
                    milestoneId={Number(milestone.id)}
                    setMilestoneSteps={setMilestoneSteps}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default KeyMilestonesAndActions;
