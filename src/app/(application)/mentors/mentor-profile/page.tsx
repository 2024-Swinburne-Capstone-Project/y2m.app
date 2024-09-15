'use client';

import { ErrorAlert } from '@/components/common/error-alert';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { Education, Experience, Skill, User } from '@/types/db';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileView from './components/profile-view';
import { useProfile, useUserProfile } from '@/hooks/useProfile';
import { useSubmitMentorFeedback } from '@/hooks/useMentorFeedback';
import EducationSection from '@/components/common/education-section';
import ExperienceSection from '@/components/common/experience-section';
import SkillsSection from '@/components/common/skill-section';
import { useMentorshipRequests } from '@/hooks/useMentorshipRequests';
import { toast } from '@/components/ui/use-toast';
import Testimonials from '@/components/common/testimonials';
import { Testimonial } from '@/types';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const { profile } = useProfile();
  const [loggedInUser, setLoggedInUser] = useState<User>({} as User);
  const [user, setUser] = useState<User>({} as User);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [existingConnection, setExistingConnection] = useState(false);
  const [existingRequest, setExistingRequest] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hasGivenFeedback, setHasGivenFeedback] = useState(false);
  const { data, isLoading, error, refetch } = useUserProfile(id);
  const { submitMentorFeedback } = useSubmitMentorFeedback();
  const { createRequest, isCreating } = useMentorshipRequests();

  useEffect(() => {
    if (data) {
      setUser(data.user || ({} as User));
      setEducations((data.educations as unknown as Education[]) || []);
      setExperiences((data.experiences as unknown as Experience[]) || []);
      setSkills((data.skills as unknown as Skill[]) || []);
      setExistingConnection(data.hasExistingConnection);
      setExistingRequest(data.hasExistingRequest);
      setTestimonials(data.testimonials || []);
    }
  }, [data]);

  useEffect(() => {
    if (profile) {
      setLoggedInUser(profile.user);
    }
  }, [profile]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const loggedInUserTestimonial = testimonials.find((t) => t.userId === loggedInUser.id);
      if (loggedInUserTestimonial) {
        setHasGivenFeedback(true);
      }
    }
  }, [testimonials, loggedInUser.id]);

  async function submitFeedback(feedback: string, rating: number) {
    await submitMentorFeedback(id, feedback, rating);
    refetch();
  }

  const handleRequestMentorship = async (mentorId: string, message: string) => {
    try {
      await createRequest({ mentorId, message });
      toast({
        title: 'Mentorship request sent successfully',
        description: 'The mentor will be notified of your request.',
      });
    } catch (error) {
      toast({
        title: 'Failed to send mentorship request',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
    refetch();
  };

  return (
    <div className="mx-auto mt-10 min-h-screen max-w-7xl flex-col items-center bg-background">
      {isLoading ? (
        <LoadingSkeleton count={4} />
      ) : error ? (
        <ErrorAlert message={error.message} />
      ) : (
        <div>
          <ProfileView
            loggedInUser={loggedInUser}
            profile={user}
            hasExistingConnection={existingConnection}
            hasExistingRequest={existingRequest}
            submitFeedback={submitFeedback}
            onRequestMentorship={handleRequestMentorship}
            isCreating={isCreating}
            hasGivenFeedback={hasGivenFeedback}
          />
          <EducationSection education={educations} onUpdate={setEducations} disabled />
          <ExperienceSection experience={experiences} onUpdate={setExperiences} disabled />
          <SkillsSection skills={skills} onUpdate={setSkills} disabled />
          {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        </div>
      )}
    </div>
  );
}
