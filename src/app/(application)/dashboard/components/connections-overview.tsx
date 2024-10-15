import Title from '@/components/common/title';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Users, Search } from 'lucide-react';
import Link from 'next/link';

interface ConnectionsOverviewProps {
  title: string;
  count?: number;
  showSearchButton?: boolean;
}

const ConnectionsOverview: React.FC<ConnectionsOverviewProps> = ({
  title,
  count,
  showSearchButton,
}) => {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" asChild className={!showSearchButton ? 'invisible' : ''}>
          <Link href="/mentors/search">
            <Search className="mr-2 size-4" />
            Find Mentors
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="">
        <div className="grid w-full grid-cols-2 gap-4">
          <Title>{count}</Title>
          <div className="flex justify-end pr-3">
            <Users size={45} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/connections-overview">View More Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionsOverview;
