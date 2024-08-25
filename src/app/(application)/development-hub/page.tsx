'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AuthenticatedRoute } from '@/components/common/authenticated-route';
import { useDevelopmentHub } from '@/hooks/useDevelopmentHub';
import { useToast } from '@/components/ui/use-toast';
import { DevelopmentArea, Badge, MilestoneStep, Milestone } from '@/types';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
import Image from 'next/image';

export default function DevelopmentHubPage() {
  const { data, isLoading, error, saveData, isSaving, saveError } = useDevelopmentHub();
  const { toast } = useToast();
  const [milestoneSteps, setMilestoneSteps] = useState<MilestoneStep[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [developmentAreas, setDevelopmentAreas] = useState<DevelopmentArea[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const prevMilestonesLengthRef = useRef(0);

  const handleSave = useCallback(async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milestones, milestoneSteps, developmentAreas, badges, toast]);

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
      handleSave().then(() => {
        prevMilestonesLengthRef.current = milestones.length;
      });
    }
  }, [milestones, handleSave]);

  return (
    <AuthenticatedRoute>
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
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

            <div className="grid gap-8 lg:grid-cols-3">
              <MilestoneProgress milestones={milestones} />
              <MyBadges badges={badges} setBadges={setBadges} />
              <DevelopmentAreas areas={developmentAreas} setAreas={setDevelopmentAreas} />
            </div>

            <GraphicalTimeline
              title={developmentHubConfig.graphicalTimeline.title}
              milestones={milestones}
              milestoneSteps={milestoneSteps}
            />

            <KeyMilestonesAndActions
              milestones={milestones}
              milestoneSteps={milestoneSteps}
              setMilestones={setMilestones}
              setMilestoneSteps={setMilestoneSteps}
            />
          </>
        )}

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>

        {saveError && <ErrorAlert message={saveError.message} />}
      </div>
    </AuthenticatedRoute>
  );
}
