'use client';

import React from 'react';
import DevelopmentAreas from './components/development-areas';
import MilestoneProgress from './components/milestone-progress';
import GraphicalTimeline from './components/graphical-timeline';
import KeyMilestonesAndActions from './components/key-milestones-and-actions';
import MyBadges from './components/my-badges';
import { AuthenticatedRoute } from '@/components/common/authenticated-route';
import { useDevelopmentHub } from '@/hooks/useDevelopmentHub';
import Title from '@/components/common/title';
import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import Image from 'next/image';
import { developmentHubConfig } from '@/config/application/development-hub';

export default function DevelopmentHubPage() {
  const { milestonesWithSteps, developmentAreas, badges, isLoading, error } = useDevelopmentHub();

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AuthenticatedRoute>
      <div className="mx-auto mt-10 min-h-screen max-w-7xl flex-col items-center bg-background">
        <MainSection>
          <MainSectionBody className="space-y-6">
            <Title>{developmentHubConfig.heroSection.title.text}</Title>
            <Image
              src={developmentHubConfig.heroSection.imagePath}
              alt={developmentHubConfig.heroSection.title.text}
              width={300}
              height={300}
              className="dark:rounded-full dark:bg-foreground"
            />
          </MainSectionBody>
        </MainSection>
        <MilestoneProgress milestones={milestonesWithSteps} />
        <GraphicalTimeline milestones={milestonesWithSteps} />
        <MyBadges badges={badges} />
        <DevelopmentAreas areas={developmentAreas} />
        <KeyMilestonesAndActions milestonesWithSteps={milestonesWithSteps} />
      </div>
    </AuthenticatedRoute>
  );
}
