'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { ErrorAlert } from '@/components/common/error-alert';
import { useProfile } from '@/hooks/useProfile';
import ProfileSection from '@/app/(application)/profile/components/profile-section';
import EducationSection from '@/app/(application)/profile/components/education-section';
import ExperienceSection from '@/app/(application)/profile/components/experience-section';
import SkillsSection from '@/app/(application)/profile/components/skill-section';
import { Education, Experience, Skill, UserProfile } from '@/types';
import { User } from '@/types/profile/user';

export default function ProfilePage() {
  const { profile, isLoading, error, saveProfile, isSaving, saveError } = useProfile();
  const [user, setUser] = useState<User>({} as User);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setUser(profile.user || ({} as User));
      setEducations(profile.education || []);
      setExperiences(profile.experience || []);
      setSkills(profile.skills || []);
    }
  }, [profile]);

  const handleSave = async () => {
    const updatedProfile: UserProfile = {
      user,
      education: educations,
      experience: experiences,
      skills,
    };

    try {
      await saveProfile(updatedProfile);
      setIsEditing(false);
      toast({ title: 'Success', description: 'Your profile has been updated.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) return <LoadingSkeleton count={4} />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <div className="mx-auto mt-10 min-h-screen max-w-7xl flex-col items-center bg-background">
      <ProfileSection
        profile={user}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onChange={setUser}
      />
      <EducationSection education={educations} onUpdate={setEducations} disabled={!isEditing} />
      <ExperienceSection experience={experiences} onUpdate={setExperiences} disabled={!isEditing} />
      <SkillsSection skills={skills} onUpdate={setSkills} disabled={!isEditing} />

      {isEditing && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}

      {saveError && <ErrorAlert message={saveError.message} />}
    </div>
  );
}
