'use client';

import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMentorSearch } from '@/hooks/useMentorSearch';
import { useMentorshipRequests } from '@/hooks/useMentorshipRequests';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MentorshipRequestStatus } from '@/types/mentorship-request/mentorship-request';
import ProfileCard from '@/components/common/profile-card';

export default function MentorSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { mentors, isLoading, error } = useMentorSearch(searchQuery);
  const { requests, createRequest, isCreating } = useMentorshipRequests();
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const { toast } = useToast();

  const mentorRequestStatus = useMemo(() => {
    const statusMap = new Map<string, MentorshipRequestStatus>();
    requests?.forEach((request) => {
      statusMap.set(request.mentorId, request.status);
    });
    return statusMap;
  }, [requests]);

  const handleRequestMentorship = async (mentorId: string) => {
    try {
      await createRequest({ mentorId, message: requestMessage });
      toast({
        title: 'Mentorship request sent successfully',
        description: 'The mentor will be notified of your request.',
      });
      setSelectedMentorId(null);
      setRequestMessage('');
    } catch (error) {
      toast({
        title: 'Failed to send mentorship request',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Find a Mentor</h1>
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search mentors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grow"
        />
        <Button>Search</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => {
          const requestStatus = mentorRequestStatus.get(mentor.user.id);
          const isPending = requestStatus === MentorshipRequestStatus.PENDING;
          const isAccepted = requestStatus === MentorshipRequestStatus.ACCEPTED;

          return (
            <ProfileCard
              userData={mentor}
              key={mentor.user.id}
              actionButton={
                <Dialog
                  open={selectedMentorId === mentor.user.id}
                  onOpenChange={(open) => !open && setSelectedMentorId(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="mt-4 w-full"
                      onClick={() => setSelectedMentorId(mentor.user.id)}
                      disabled={isPending || isAccepted}
                    >
                      {isPending
                        ? 'Request Pending'
                        : isAccepted
                          ? 'Request Accepted'
                          : 'Request Mentorship'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Mentorship from {mentor.user.name}</DialogTitle>
                    </DialogHeader>
                    <Textarea
                      placeholder="Enter your mentorship request message here..."
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                    />
                    <Button
                      onClick={() => handleRequestMentorship(mentor.user.id)}
                      disabled={isCreating}
                    >
                      {isCreating ? 'Sending Request...' : 'Send Request'}
                    </Button>
                  </DialogContent>
                </Dialog>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
