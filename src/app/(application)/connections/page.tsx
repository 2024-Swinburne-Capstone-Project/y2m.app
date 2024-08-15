'use client';

import React from 'react';
import { useMentorshipRequests } from '@/hooks/useMentorshipRequests';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  MentorshipRequest,
  MentorshipRequestStatus,
} from '@/types/mentorship-request/mentorship-request';
import ProfileCard from '@/components/common/profile-card';

export default function ViewRequestsPage() {
  const { requests, acceptRequest, rejectRequest, isLoading, error, isUpdating } =
    useMentorshipRequests();
  const { toast } = useToast();

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast({ title: 'Request accepted successfully' });
    } catch (error) {
      toast({ title: 'Failed to accept request', variant: 'destructive' });
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectRequest(requestId);
      toast({ title: 'Request rejected successfully' });
    } catch (error) {
      toast({ title: 'Failed to reject request', variant: 'destructive' });
    }
  };

  const filteredRequests = () => {
    return requests?.filter((request) => request.mentee !== null) ?? ([] as MentorshipRequest[]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Mentorship Requests</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests().map((request: MentorshipRequest) => (
          <ProfileCard
            key={request.id}
            userData={request.mentee}
            actionButton={
              request.status === MentorshipRequestStatus.PENDING ? (
                <div className="mt-4 flex justify-between">
                  <Button onClick={() => handleAccept(request.id)} disabled={isUpdating}>
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(request.id)}
                    disabled={isUpdating}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <p>Status: {request.status}</p>
                </div>
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
