import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateMilestoneStepData, MilestoneStep } from '@/types';
import { format } from 'date-fns/format';

interface AddMilestoneStepProps {
  milestoneId: number;
  setMilestoneSteps: React.Dispatch<React.SetStateAction<MilestoneStep[]>>;
}

const AddMilestoneStep: React.FC<AddMilestoneStepProps> = ({ milestoneId, setMilestoneSteps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED'>('NOT_STARTED');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStep: CreateMilestoneStepData = {
      name,
      status,
      milestoneId,
      dueDate,
    };

    setMilestoneSteps((prevSteps) => [...prevSteps, newStep as unknown as MilestoneStep]);
    setIsOpen(false);
    setName('');
    setStatus('NOT_STARTED');
    setDueDate(new Date());
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          Add Step
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Step</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Select
              onValueChange={(value: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED') =>
                setStatus(value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <Input
              type="date"
              value={dueDate ? format(new Date(dueDate.toString()), 'yyyy-MM-dd') : ''}
              onChange={(e) => setDueDate(new Date(e.target.value))}
            />
          </div>
          <Button type="submit">Add Step</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMilestoneStep;
