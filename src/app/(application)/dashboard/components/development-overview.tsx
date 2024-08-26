import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Milestone, MilestoneStep } from '@/types';
import Link from 'next/link';
import DevelopmentChart from '../../../../components/application/development-chart';

interface DevelopmentOverviewProps {
  title: string;
  milestones: Milestone[];
  milestoneSteps: MilestoneStep[];
}

const DevelopmentOverview: React.FC<DevelopmentOverviewProps> = ({
  title,
  milestones,
  milestoneSteps,
}) => {
  return (
    <div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <DevelopmentChart milestones={milestones} milestoneSteps={milestoneSteps} />
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/development-hub">View More Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DevelopmentOverview;
