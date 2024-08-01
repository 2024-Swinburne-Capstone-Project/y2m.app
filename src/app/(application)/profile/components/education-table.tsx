import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Education } from '@/types/profile/education';
import { profileConfig } from '@/config/application/profile-config';

export default function EducationTable() {
  //TODO - fetch data from API
  const educationData: Education[] = [
    {
      Institution: 'University of Toronto',
      Degree: 'Bachelor of Science',
      FieldOfStudy: 'Computer Science',
      OnGoing: false,
      Grade: 'A+',
      StartDate: '2018-09-01',
      EndDate: '2022-06-01',
    },
    {
      Institution: 'University of Waterloo',
      Degree: 'Master of Science',
      FieldOfStudy: 'Computer Science',
      OnGoing: true,
      StartDate: '2022-09-01',
      EndDate: '',
    },
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {profileConfig.educationTable.headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {educationData.map((education, index) => (
            <TableRow key={index}>
              <TableCell>{education.Institution}</TableCell>
              <TableCell>{education.Degree}</TableCell>
              <TableCell>{education.FieldOfStudy}</TableCell>
              <TableCell>{education.OnGoing ? 'Yes' : 'No'}</TableCell>
              <TableCell>{education.Grade}</TableCell>
              <TableCell>{education.StartDate}</TableCell>
              <TableCell>{education.EndDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
