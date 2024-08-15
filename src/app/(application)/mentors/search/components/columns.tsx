import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserData } from '@/types/mentor-search/user-data';

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'user.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'skills',
    header: 'Skills',
    cell: ({ row }) => {
      const skills = row.original.skills;
      return (
        <div className="flex flex-wrap gap-1">
          {skills.length > 0 ? (
            skills.map((skill, index) => <Badge key={index}>{skill.name}</Badge>)
          ) : (
            <span className="text-gray-400">No skills provided</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'experience',
    header: 'Experience',
    cell: ({ row }) => {
      const experiences = row.original.experience;
      return (
        <div>
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={String(exp.id)} className="mb-2">
                <p className="font-semibold">
                  {exp.position} at {exp.company}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(exp.startDate.toString()).toLocaleDateString()} -
                  {exp.current
                    ? 'Present'
                    : exp.endDate
                      ? new Date(exp.endDate.toString()).toLocaleDateString()
                      : 'N/A'}
                </p>
                <p className="text-sm">{exp.location}</p>
              </div>
            ))
          ) : (
            <span className="text-gray-400">No experience provided</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'education',
    header: 'Education',
    cell: ({ row }) => {
      const educations = row.original.education;
      return (
        <div>
          {educations.length > 0 ? (
            educations.map((edu) => (
              <div key={String(edu.id)} className="mb-2">
                <p className="font-semibold">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                <p>{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {new Date(edu.startDate.toString()).toLocaleDateString()} -
                  {edu.onGoing
                    ? 'Present'
                    : edu.endDate
                      ? new Date(edu.endDate.toString()).toLocaleDateString()
                      : 'N/A'}
                </p>
                {edu.grade && <p className="text-sm">Grade: {edu.grade}</p>}
              </div>
            ))
          ) : (
            <span className="text-gray-400">No education provided</span>
          )}
        </div>
      );
    },
  },
];
