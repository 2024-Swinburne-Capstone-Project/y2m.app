import React, { useState } from 'react';
import { Education } from '@/types';
import { DataTable } from '@/components/common/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EducationForm from './education-form';
import { TableCell } from '@/components/ui/table';

interface EducationSectionProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
  disabled: boolean;
}

export default function EducationSection({ education, onUpdate, disabled }: EducationSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addEducation = (newEducation: Education) => {
    onUpdate([...education, newEducation]);
    setIsModalOpen(false);
  };

  const educationHeaders = ['Institution', 'Degree', 'Field of Study', 'Start Date', 'End Date'];

  const renderEducationRow = (edu: Education) => (
    <>
      <TableCell>{edu.institution}</TableCell>
      <TableCell>{edu.degree}</TableCell>
      <TableCell>{edu.fieldOfStudy}</TableCell>
      <TableCell>{new Date(edu.startDate.toString()).toDateString()}</TableCell>
      <TableCell>
        {edu.endDate ? new Date(edu.endDate.toString()).toDateString() : 'Present'}
      </TableCell>
    </>
  );

  return (
    <>
      <DataTable
        title="Education"
        data={education}
        headers={educationHeaders}
        renderRow={renderEducationRow}
        onAddNew={() => setIsModalOpen(true)}
        disabled={disabled}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Education</DialogTitle>
          </DialogHeader>
          <EducationForm onSubmit={addEducation} />
        </DialogContent>
      </Dialog>
    </>
  );
}
