'use client';

import { ErrorAlert } from '@/components/common/error-alert';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { Education, Experience, Skill, User } from '@/types/db';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileView from '../components/profile-view';
import { useUserProfile } from '@/hooks/useProfile';
import EducationSection from '../components/education-section';
import ExperienceSection from '../components/experience-section';
import SkillsSection from '../components/skill-section';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [user, setUser] = useState<User>({} as User);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const { data, isLoading, error } = useUserProfile(id);

  useEffect(() => {
    if (data) {
      setUser(data.user || ({} as User));
      setEducations((data.educations as unknown as Education[]) || []);
      setExperiences((data.experiences as unknown as Experience[]) || []);
      setSkills((data.skills as unknown as Skill[]) || []);
    }
  }, [data]);

  return (
    <div className="mx-auto mt-10 min-h-screen max-w-7xl flex-col items-center bg-background">
      {isLoading ? (
        <LoadingSkeleton count={4} />
      ) : error ? (
        <ErrorAlert message={error.message} />
      ) : (
        <div>
          <ProfileView profile={user} />
          <EducationSection education={educations} onUpdate={setEducations} disabled />
          <ExperienceSection experience={experiences} onUpdate={setExperiences} disabled />
          <SkillsSection skills={skills} onUpdate={setSkills} disabled />
        </div>
      )}
    </div>
  );
}
