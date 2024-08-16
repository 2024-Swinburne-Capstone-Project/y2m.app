'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConnections } from '@/hooks/useConnections';
import { ErrorAlert } from '@/components/common/error-alert';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import ConnectionsList from './components/connections-list';
import { connectionsOverviewConfig } from '@/config/application/connections-overview';

export default function ConnectionsOverviewPage() {
  const { mentors, mentees, isLoading, error } = useConnections();

  if (isLoading) return <LoadingSkeleton count={3} className={'container mx-auto py-10'} />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">{connectionsOverviewConfig.pageTitle}</h1>

      <Tabs defaultValue="mentors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mentors">{connectionsOverviewConfig.tabs.mentors}</TabsTrigger>
          <TabsTrigger value="mentees">{connectionsOverviewConfig.tabs.mentees}</TabsTrigger>
        </TabsList>
        <TabsContent value="mentors">
          <ConnectionsList connections={mentors} type="mentors" />
        </TabsContent>
        <TabsContent value="mentees">
          <ConnectionsList connections={mentees} type="mentees" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
