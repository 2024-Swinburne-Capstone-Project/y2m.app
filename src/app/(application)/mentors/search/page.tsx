'use client';

import React, { useEffect, useState } from 'react';
import { useMentorSearch } from '@/hooks/useMentorSearch';
import { useMentorshipRequests } from '@/hooks/useMentorshipRequests';
import { useRecommendedMentors } from '@/hooks/useRecommendedMentors';
import { useToast } from '@/components/ui/use-toast';

import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { ErrorAlert } from '@/components/common/error-alert';
import HeroSection from '@/app/(application)/mentors/search/components/hero-section';
import SearchSection from '@/app/(application)/mentors/search/components/search-section';
import ResultsSection from '@/app/(application)/mentors/search/components/results-section';

export default function MentorSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { mentors, isLoading, error, refetch } = useMentorSearch(searchQuery);
  const {
    recommendedMentors,
    isLoading: isLoadingRecommended,
    error: recommendedError,
  } = useRecommendedMentors();
  const { requests, createRequest, isCreating } = useMentorshipRequests();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    refetch();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
      refetch();
    }
  }, [refetch]);

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
  };

  return (
    <div className="container mx-auto space-y-10 py-10">
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      {isLoading ? (
        <LoadingSkeleton
          count={6}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        />
      ) : error ? (
        <ErrorAlert message={error.message} />
      ) : (
        <ResultsSection
          mentors={mentors}
          requests={requests ?? []}
          onRequestMentorship={handleRequestMentorship}
          isCreating={isCreating}
        />
      )}
      {isLoadingRecommended ? (
        <LoadingSkeleton
          count={3}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        />
      ) : recommendedError ? (
        <ErrorAlert message={recommendedError.message} />
      ) : recommendedMentors.length > 0 ? (
        <>
          <div className="text-center">Or view recommended mentors</div>
          <ResultsSection
            mentors={recommendedMentors}
            requests={requests ?? []}
            onRequestMentorship={handleRequestMentorship}
            isCreating={isCreating}
          />
        </>
      ) : (
        <div className="text-center text-secondary">
          We could not find any recommended mentors. Please add more skills to your profile to get
          better recommendations.
        </div>
      )}
    </div>
  );
}
