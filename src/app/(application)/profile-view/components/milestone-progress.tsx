import NoDataDisplay from '@/components/common/no-data-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Milestone } from '@/types';
import { Milestone as MilestoneIcon } from 'lucide-react';

type MilestoneProgressProps = {
  milestones: Milestone[];
  noDataTitle?: string;
};

const MilestoneProgress = ({ milestones, noDataTitle }: MilestoneProgressProps) => {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Milestone Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {milestones.length === 0 ? (
          <NoDataDisplay title={noDataTitle ?? ''} icon={<MilestoneIcon />} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Milestone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone, index) => (
                <TableRow key={index}>
                  <TableCell>{milestone.title}</TableCell>
                  <TableCell>{milestone.status}</TableCell>
                  <TableCell>
                    {new Date(milestone.endDate.toString()).toLocaleDateString('en-AU')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneProgress;
