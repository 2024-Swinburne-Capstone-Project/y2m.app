import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Experience } from '@/types/profile/Profile';
import { profileConfig } from '@/config/application/profile-config';

export default function ExperienceTable() {
  //TODO - fetch data from API
  const experienceData: Experience[] = [
    {
      Position: 'Software Engineer',
      Company: 'Google',
      Location: 'Mountain View, CA',
      Current: true,
      StartDate: '2020-09-01',
      EndDate: '',
    },
    {
      Position: 'Software Engineer Intern',
      Company: 'Facebook',
      Location: 'Menlo Park, CA',
      Current: false,
      StartDate: '2019-05-01',
      EndDate: '2019-08-01',
    },
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {profileConfig.experienceTable.headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {experienceData.map((experience, index) => (
            <TableRow key={index}>
              <TableCell>{experience.Position}</TableCell>
              <TableCell>{experience.Company}</TableCell>
              <TableCell>{experience.Location}</TableCell>
              <TableCell>{experience.Current ? 'Yes' : 'No'}</TableCell>
              <TableCell>{experience.StartDate}</TableCell>
              <TableCell>{experience.EndDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
