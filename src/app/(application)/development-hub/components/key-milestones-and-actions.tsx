import React, { useState } from 'react';
import { Milestone, MilestoneStep } from '@/types';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle2,
  Clock,
  Circle,
  MoreHorizontal,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import AddMilestoneStep from './add-milestone-step';
import RemoveButton from '@/components/common/remove-button';
import AddMilestone from './add-milestone';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="size-5 text-green-500" />;
      case 'IN_PROGRESS':
        return <Clock className="size-5 text-blue-500" />;
      default:
        return <Circle className="size-5 text-gray-400" />;
    }
  };

  const calculateProgress = (milestoneId: number) => {
    const steps = milestoneSteps.filter((step) => step.milestoneId === Number(milestoneId));
    const completedSteps = steps.filter((step) => step.status === 'COMPLETED').length;
    return steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;
  };

  const toggleMilestoneExpansion = (milestoneId: number) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
  };

  const updateStepStatus = (stepIndex: number, newStatus: string) => {
    setMilestoneSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === stepIndex
          ? { ...step, status: newStatus as 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' }
          : step
      )
    );
  };

  const removeStep = (stepIndex: number) => {
    setMilestoneSteps((prevSteps) => prevSteps.filter((_, index) => index !== stepIndex));
  };

  const removeMilestone = (milestoneIndex: number) => {
    setMilestones((prevMilestones) =>
      prevMilestones.filter((_, index) => index !== milestoneIndex)
    );
    setMilestoneSteps((prevSteps) =>
      prevSteps.filter((step) => step.milestoneId !== Number(milestones[milestoneIndex].id))
    );
  };

  const updateMilestoneStatus = (milestoneIndex: number, newStatus: string) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, index) =>
        index === milestoneIndex
          ? { ...milestone, status: newStatus as 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' }
          : milestone
      )
    );
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{developmentHubConfig.keyMilestones.title}</CardTitle>
        <AddMilestone setMilestones={setMilestones} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, milestoneIndex) => (
            <div
              key={milestoneIndex}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(milestone.status)}
                  <h3 className="text-lg font-semibold">{milestone.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => updateMilestoneStatus(milestoneIndex, 'NOT_STARTED')}
                      >
                        Not Started
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateMilestoneStatus(milestoneIndex, 'IN_PROGRESS')}
                      >
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateMilestoneStatus(milestoneIndex, 'COMPLETED')}
                      >
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <RemoveButton
                    onRemove={() => removeMilestone(milestoneIndex)}
                    tooltipContent="Remove Milestone"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleMilestoneExpansion(Number(milestone.id))}
                  >
                    {expandedMilestone === Number(milestone.id) ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="size-4" />
                <span>
                  {new Date(milestone.startDate.toString()).toLocaleDateString()} -{' '}
                  {new Date(milestone.endDate?.toString()).toLocaleDateString()}
                </span>
              </div>
              <Progress className="mt-3" value={calculateProgress(Number(milestone.id))} />
              {expandedMilestone === Number(milestone.id) && (
                <>
                  <Accordion type="single" collapsible className="mt-4">
                    {milestoneSteps
                      .map((step, originalStepIndex) => ({ ...step, originalStepIndex }))
                      .filter((step) => step.milestoneId === Number(milestone.id))
                      .map((step) => (
                        <AccordionItem
                          key={step.originalStepIndex}
                          value={step.originalStepIndex.toString()}
                        >
                          <AccordionTrigger className="py-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={step.status === 'COMPLETED'}
                                onCheckedChange={(checked) =>
                                  updateStepStatus(
                                    step.originalStepIndex,
                                    checked ? 'COMPLETED' : 'NOT_STARTED'
                                  )
                                }
                              />
                              <span className={cn(step.status === 'COMPLETED' && 'line-through')}>
                                {step.name}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="py-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span>Status: {step.status}</span>
                              <div className="flex items-center space-x-2">
                                <select
                                  value={step.status}
                                  onChange={(e) =>
                                    updateStepStatus(step.originalStepIndex, e.target.value)
                                  }
                                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                                >
                                  <option value="NOT_STARTED">Not Started</option>
                                  <option value="IN_PROGRESS">In Progress</option>
                                  <option value="COMPLETED">Completed</option>
                                </select>
                                <RemoveButton
                                  onRemove={() => removeStep(step.originalStepIndex)}
                                  tooltipContent="Remove Step"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                  <AddMilestoneStep
                    milestoneId={Number(milestone.id)}
                    setMilestoneSteps={setMilestoneSteps}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMilestonesAndActions;
