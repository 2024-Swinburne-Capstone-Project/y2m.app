import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateMilestoneData, Milestone } from '@/types';
import { PlusCircle } from 'lucide-react';

interface AddMilestoneProps {
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
}

const AddMilestone: React.FC<AddMilestoneProps> = ({ setMilestones }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'>('NOT_STARTED');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMilestone: CreateMilestoneData = {
      title,
      status,
      startDate: startDate,
      endDate: endDate,
    };
    setMilestones((prevMilestones) => [...prevMilestones, newMilestone as unknown as Milestone]);

    setIsOpen(false);
    setTitle('');
    setStatus('NOT_STARTED');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 size-4" />
          Add Milestone
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Milestone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Select
              onValueChange={(value: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED') =>
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
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Input
              id="startDate"
              type="date"
              value={startDate?.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <Input
              id="endDate"
              type="date"
              value={endDate?.toISOString().split('T')[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit">Add Milestone</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMilestone;
