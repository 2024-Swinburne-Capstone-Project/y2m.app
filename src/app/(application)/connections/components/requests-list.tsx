import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { MentorshipRequest } from '@/types/mentorship-request/mentorship-request';
import RequestCard from '@/app/(application)/connections/components/request-card';
import { Inbox } from 'lucide-react';
import NoDataDisplay from '@/components/common/no-data-display';
import { connectionsConfig } from '@/config/application/connections';

interface RequestsListProps {
  requests: MentorshipRequest[];
  type: 'incoming' | 'outgoing';
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  isUpdating: boolean;
}

const RequestsList: React.FC<RequestsListProps> = ({
  requests,
  type,
  onAccept,
  onReject,
  isUpdating,
}) => {
  const { user } = useUser();

  const filteredRequests = requests.filter((request) =>
    type === 'incoming' ? request.mentorId === user?.sub : request.menteeId === user?.sub
  );

  if (filteredRequests.length === 0) {
    const noDataConfig = connectionsConfig.noDataDisplay[type];
    return (
      <NoDataDisplay
        title={noDataConfig.title}
        description={noDataConfig.description}
        icon={<Inbox />}
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredRequests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          type={type}
          onAccept={onAccept}
          onReject={onReject}
          isUpdating={isUpdating}
        />
      ))}
    </div>
  );
};

export default RequestsList;
