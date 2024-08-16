import React from 'react';
import { UserData } from '@/types/mentor-search/user-data';
import { Users } from 'lucide-react';
import NoDataDisplay from '@/components/common/no-data-display';
import { connectionsOverviewConfig } from '@/config/application/connections-overview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ConnectionCard from '@/app/(application)/connections-overview/components/connections-card';

interface ConnectionsListProps {
  connections: UserData[];
  type: 'mentors' | 'mentees';
}

const ConnectionsList: React.FC<ConnectionsListProps> = ({ connections, type }) => {
  if (connections.length === 0) {
    const noDataConfig = connectionsOverviewConfig.noDataDisplay[type];
    return (
      <div className="mt-4">
        <NoDataDisplay
          title={noDataConfig.title}
          description={noDataConfig.description}
          icon={<Users size={48} />}
        />
        <div className="mt-4 flex justify-center">
          <Button asChild>
            <Link href={type === 'mentors' ? '/mentors/search' : '/profile'}>
              {connectionsOverviewConfig.actionButton[type]}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {connections.map((connection) => (
        <ConnectionCard key={connection.user.id} userData={connection} />
      ))}
    </div>
  );
};

export default ConnectionsList;
