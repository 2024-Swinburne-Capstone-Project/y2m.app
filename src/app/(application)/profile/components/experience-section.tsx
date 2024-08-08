import React, { useState } from 'react';
import { Experience } from '@/types';
import { DataTable } from '@/components/common/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ExperienceForm from './experience-form';
import { TableCell } from '@/components/ui/table';

interface ExperienceSectionProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
  disabled: boolean;
}

export default function ExperienceSection({
  experience,
  onUpdate,
  disabled,
}: ExperienceSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addExperience = (newExperience: Experience) => {
    onUpdate([...experience, newExperience]);
    setIsModalOpen(false);
  };

  const experienceHeaders = ['Company', 'Position', 'Location', 'Start Date', 'End Date'];

  const renderExperienceRow = (exp: Experience) => (
    <>
      <TableCell>{exp.company}</TableCell>
      <TableCell>{exp.position}</TableCell>
      <TableCell>{exp.location}</TableCell>
      <TableCell>{new Date(exp.startDate.toString()).toDateString()}</TableCell>
      <TableCell>
        {exp.endDate ? new Date(exp.endDate.toString()).toDateString() : 'Present'}
      </TableCell>
    </>
  );

  return (
    <>
      <DataTable
        title="Experience"
        data={experience}
        headers={experienceHeaders}
        renderRow={renderExperienceRow}
        onAddNew={() => setIsModalOpen(true)}
        disabled={disabled}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Experience</DialogTitle>
          </DialogHeader>
          <ExperienceForm onSubmit={addExperience} />
        </DialogContent>
      </Dialog>
    </>
  );
}
