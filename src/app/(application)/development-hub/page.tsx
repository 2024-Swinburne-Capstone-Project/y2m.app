'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AuthenticatedRoute } from '@/components/common/authenticated-route';
import { useDevelopmentHub } from '@/hooks/useDevelopmentHub';
import { useToast } from '@/components/ui/use-toast';
import { DevelopmentArea, Badge, MilestoneStep, Milestone } from '@/types';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DevelopmentAreas from './components/development-areas';
import MilestoneProgress from './components/milestone-progress';
import GraphicalTimeline from './components/graphical-timeline';
import KeyMilestonesAndActions from './components/key-milestones-and-actions';
import MyBadges from './components/my-badges';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { ErrorAlert } from '@/components/common/error-alert';
import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import Title from '@/components/common/title';

export default function DevelopmentHubPage() {
  const { data, isLoading, error, saveData, isSaving, saveError } = useDevelopmentHub();
  const { toast } = useToast();

  const [milestoneSteps, setMilestoneSteps] = useState<MilestoneStep[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [developmentAreas, setDevelopmentAreas] = useState<DevelopmentArea[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  const prevMilestonesLengthRef = useRef(0);

  useEffect(() => {
    if (data) {
      setMilestoneSteps(data.milestoneSteps ?? []);
      setDevelopmentAreas(data.developmentAreas ?? []);
      setBadges(data.badges ?? []);
      setMilestones(data.milestones ?? []);
      prevMilestonesLengthRef.current = data.milestones?.length ?? 0;
    }
  }, [data]);

  useEffect(() => {
    if (milestones.length > prevMilestonesLengthRef.current) {
      handleSaveMilestone().then(() => {
        prevMilestonesLengthRef.current = milestones.length;
      });
    }
  }, [milestones]);

  const handleSave = async () => {
    try {
      await saveData({ milestones, milestoneSteps, developmentAreas, badges });
      toast({ title: 'Success', description: 'Your changes have been saved.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveMilestone = async () => {
    try {
      await saveData({ milestones });
      toast({ title: 'Success', description: 'Your milestone change has been saved.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save milestone. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthenticatedRoute>
      <div className="mx-auto mt-10 min-h-screen max-w-7xl flex-col items-center bg-background">
        {isLoading ? (
          <LoadingSkeleton count={4} />
        ) : error ? (
          <ErrorAlert message={error.message} />
        ) : (
          <>
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
            <MilestoneProgress milestones={milestones} />
            <GraphicalTimeline milestones={milestones} milestoneSteps={milestoneSteps} />
            <MyBadges badges={badges} setBadges={setBadges} />
            <DevelopmentAreas areas={developmentAreas} setAreas={setDevelopmentAreas} />
            <KeyMilestonesAndActions
              milestones={milestones}
              milestoneSteps={milestoneSteps}
              setMilestones={setMilestones}
              setMilestoneSteps={setMilestoneSteps}
            />
          </>
        )}

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving || isLoading} className="mb-5">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
        {saveError && <ErrorAlert message={saveError.message} />}
      </div>
    </AuthenticatedRoute>
  );
}
