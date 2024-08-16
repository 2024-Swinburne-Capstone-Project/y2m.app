'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMentorshipRequests } from '@/hooks/useMentorshipRequests';
import { useToast } from '@/components/ui/use-toast';
import { ErrorAlert } from '@/components/common/error-alert';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import RequestsList from '@/app/(application)/connections/components/requests-list';
import { connectionsConfig } from '@/config/application/connections';

export default function ViewRequestsPage() {
  const { requests, acceptRequest, rejectRequest, isLoading, error, isUpdating } =
    useMentorshipRequests();
  const { toast } = useToast();

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast({ title: connectionsConfig.toastMessages.acceptSuccess });
    } catch (error) {
      toast({ title: connectionsConfig.toastMessages.acceptError, variant: 'destructive' });
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectRequest(requestId);
      toast({ title: connectionsConfig.toastMessages.rejectSuccess });
    } catch (error) {
      toast({ title: connectionsConfig.toastMessages.rejectError, variant: 'destructive' });
    }
  };

  if (isLoading) return <LoadingSkeleton count={3} className={'container mx-auto py-10'} />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">{connectionsConfig.pageTitle}</h1>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">{connectionsConfig.tabs.incoming}</TabsTrigger>
          <TabsTrigger value="outgoing">{connectionsConfig.tabs.outgoing}</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <RequestsList
            requests={requests ?? []}
            type="incoming"
            onAccept={handleAccept}
            onReject={handleReject}
            isUpdating={isUpdating}
          />
        </TabsContent>
        <TabsContent value="outgoing">
          <RequestsList requests={requests ?? []} type="outgoing" isUpdating={isUpdating} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
