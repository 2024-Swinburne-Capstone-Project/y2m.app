import React from 'react';
import { Button } from '@/components/ui/button';
import ProfileCard from '@/components/common/profile-card';
import { MentorshipRequest } from '@/types/mentorship-request/mentorship-request';
import { connectionsConfig } from '@/config/application/connections';
import Link from 'next/link';

interface RequestCardProps {
  request: MentorshipRequest;
  type: 'incoming' | 'outgoing';
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  isUpdating: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({
  request,
  type,
  onAccept,
  onReject,
  isUpdating,
}) => {
  const profileData = type === 'incoming' ? request.mentee : request.mentor;
  const actionButton =
    type === 'incoming' ? (
      <div className="mt-4 flex justify-between">
        <Button variant={'outline'} asChild>
          <Link href={`/profile-view?id=${request.menteeId}`}>
            {connectionsConfig.requestCard.viewProfileButton}
          </Link>
        </Button>
        <div className="space-x-2">
          <Button onClick={() => onAccept?.(request.id)} disabled={isUpdating}>
            {connectionsConfig.requestCard.acceptButton}
          </Button>
          <Button
            variant="destructive"
            onClick={() => onReject?.(request.id)}
            disabled={isUpdating}
          >
            {connectionsConfig.requestCard.rejectButton}
          </Button>
        </div>
      </div>
    ) : (
      <div className="mt-4">
        <p>{connectionsConfig.requestCard.pendingStatus}</p>
      </div>
    );

  return <ProfileCard userData={profileData} actionButton={actionButton} />;
};

export default RequestCard;
