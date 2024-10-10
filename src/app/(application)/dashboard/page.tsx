// app/(application)/dashboard/page.tsx
'use client';

import React from 'react';
import { AuthenticatedRoute } from '@/components/common/authenticated-route';
import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import { dashboardConfig } from '@/config/application/dashboard';
import Title from '@/components/common/title';
import Image from 'next/image';
import Subtitle from '@/components/common/subtitle';
import ConnectionsOverview from './components/connections-overview';
import DevelopmentOverview from './components/development-overview';
import { useConnections } from '@/hooks/useConnections';
import { useDevelopmentHub } from '@/hooks/useDevelopmentHub';
import { useProfile } from '@/hooks/useProfile';
import { SuggestedSkills } from '@/components/application/suggested-skills';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { ErrorAlert } from '@/components/common/error-alert';

export default function DashboardPage() {
  const {
    mentors,
    mentees,
    isLoading: isConnectionsLoading,
    error: connectionsError,
  } = useConnections();
  const {
    data,
    isLoading: isDevelopmentHubLoading,
    error: developmentHubError,
  } = useDevelopmentHub();
  const { profile, isLoading: isProfileLoading, error: profileError } = useProfile();

  const isLoading = isConnectionsLoading || isDevelopmentHubLoading || isProfileLoading;
  const error = connectionsError || developmentHubError || profileError;

  if (isLoading) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <LoadingSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ErrorAlert message="Failed to load dashboard data. Please try again later." />
      </div>
    );
  }

  return (
    <AuthenticatedRoute>
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
        <MainSection>
          <MainSectionBody className="space-y-6">
            <div className="space-y-6 md:w-1/2">
              <Title>{dashboardConfig.heroContent.title.text}</Title>
              <Subtitle>{dashboardConfig.heroContent.content.text}</Subtitle>
            </div>
            <Image
              src={dashboardConfig.heroContent.imagePath}
              alt={dashboardConfig.heroContent.title.text}
              width={300}
              height={300}
              className="dark:rounded-full dark:bg-foreground"
            />
          </MainSectionBody>
        </MainSection>
        <div className="grid gap-8 lg:grid-cols-2">
          <ConnectionsOverview title={dashboardConfig.myMentors.text} count={mentors.length} />
          <ConnectionsOverview title={dashboardConfig.myMentees.text} count={mentees.length} />
        </div>
        {profile?.user?.isMentee && <SuggestedSkills />}
        <DevelopmentOverview
          title={dashboardConfig.developmentOverview.text}
          milestones={data?.milestones ?? []}
          milestoneSteps={data?.milestoneSteps ?? []}
        />
      </div>
    </AuthenticatedRoute>
  );
}
