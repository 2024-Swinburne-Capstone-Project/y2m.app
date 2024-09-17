import React, { useState } from 'react';
import { Milestone, MilestoneStep, CreateMilestoneCommentData, MilestoneComment } from '@/types';
import { format, isPast, isWithinInterval } from 'date-fns';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  CheckCircle2,
  Clock,
  Circle,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash2,
  CalendarDays,
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { Timestamp } from '@/types/db';

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
  const [newComment, setNewComment] = useState<string>('');

  const updateStepDueDate = (stepIndex: number, dueDate: Timestamp) => {
    setMilestoneSteps((prevSteps) =>
      prevSteps.map((step, index) => (index === stepIndex ? { ...step, dueDate: dueDate } : step))
    );
  };

  const addComment = (milestoneId: number) => {
    if (newComment.trim()) {
      const newCommentObj: CreateMilestoneCommentData = {
        milestoneId: milestoneId.toString(),
        content: newComment.trim(),
      };
      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone) =>
          Number(milestone.id) === milestoneId
            ? {
                ...milestone,
                comments: [
                  ...(milestone.comments || []),
                  { ...(newCommentObj as MilestoneComment), createdAt: new Date() },
                ],
              }
            : milestone
        )
      );
      setNewComment('');
    }
  };

  const removeComment = (milestoneId: number, commentIndex: number) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        Number(milestone.id) === milestoneId
          ? {
              ...milestone,
              comments: milestone.comments.filter((_, index) => index !== commentIndex),
            }
          : milestone
      )
    );
  };

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

  const getDueDateStatus = (dueDate: Date) => {
    if (isPast(dueDate)) return 'overdue';
    if (
      isWithinInterval(dueDate, {
        start: new Date(),
        end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })
    )
      return 'approaching';
    return 'ok';
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
                      .filter((step) => step.milestoneId === Number(milestone.id))
                      .map((step, stepIndex) => (
                        <AccordionItem key={stepIndex} value={stepIndex.toString()}>
                          <AccordionTrigger className="py-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={step.status === 'COMPLETED'}
                                onCheckedChange={(checked) =>
                                  updateStepStatus(stepIndex, checked ? 'COMPLETED' : 'NOT_STARTED')
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
                                  onChange={(e) => updateStepStatus(stepIndex, e.target.value)}
                                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                                >
                                  <option value="NOT_STARTED">Not Started</option>
                                  <option value="IN_PROGRESS">In Progress</option>
                                  <option value="COMPLETED">Completed</option>
                                </select>
                                <div className="flex items-center space-x-2">
                                  <CalendarDays className="size-4 text-gray-500" />
                                  <Input
                                    type="date"
                                    value={
                                      step.dueDate
                                        ? format(new Date(step.dueDate.toString()), 'yyyy-MM-dd')
                                        : ''
                                    }
                                    onChange={(e) =>
                                      updateStepDueDate(
                                        stepIndex,
                                        e.target.value as unknown as Timestamp
                                      )
                                    }
                                    className="w-auto"
                                  />
                                </div>
                                <RemoveButton
                                  onRemove={() => removeStep(stepIndex)}
                                  tooltipContent="Remove Step"
                                />
                              </div>
                            </div>
                            {step.dueDate && (
                              <div className="mt-2 flex items-center space-x-2">
                                <span
                                  className={cn(
                                    'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                    {
                                      'bg-red-100 text-red-800':
                                        getDueDateStatus(new Date(step.dueDate.toString())) ===
                                        'overdue',
                                      'bg-yellow-100 text-yellow-800':
                                        getDueDateStatus(new Date(step.dueDate.toString())) ===
                                        'approaching',
                                      'bg-green-100 text-green-800':
                                        getDueDateStatus(new Date(step.dueDate.toString())) ===
                                        'ok',
                                    }
                                  )}
                                >
                                  <CalendarDays className="mr-1 size-3" />
                                  Due: {format(new Date(step.dueDate.toString()), 'MMM d, yyyy')}
                                </span>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                  <AddMilestoneStep
                    milestoneId={Number(milestone.id)}
                    setMilestoneSteps={setMilestoneSteps}
                  />
                  <div className="mt-4">
                    <h4 className="mb-2 font-semibold">Comments</h4>
                    {milestone.comments &&
                      milestone.comments.map((comment, commentIndex) => (
                        <div
                          key={commentIndex}
                          className="mb-2 flex items-center justify-between rounded bg-gray-100 p-2 dark:bg-gray-700"
                        >
                          <div>
                            <p className="text-sm">{comment.content}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.createdAt.toString()).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeComment(Number(milestone.id), commentIndex)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                    <div className="mt-2 flex space-x-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                      />
                      <Button onClick={() => addComment(Number(milestone.id))}>
                        <MessageSquare className="mr-2 size-4" />
                        Comment
                      </Button>
                    </div>
                  </div>
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
