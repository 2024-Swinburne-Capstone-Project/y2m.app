'use client';

import { AuthenticatedRoute } from '@/components/common/authenticated-route';
import { useMyMentors } from '@/hooks/useMyMentors';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { ErrorAlert } from '@/components/common/error-alert';

export default function DevelopmentHubPage() {
  const { mentors, isLoading, error } = useMyMentors();

  if (isLoading) {
    return <LoadingSkeleton count={1} />;
  }
  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  return (
    <AuthenticatedRoute>
      <div className="mx-auto mt-10 min-h-screen max-w-7xl flex-col items-center bg-background">
        {mentors.length === 0 && (
          <div className="rounded-md bg-primary p-4 text-white shadow-md">
            You don't have any mentors yet. Add new mentors to get started.
          </div>
        )}
        {mentors.length > 0 && JSON.stringify(mentors)}
      </div>
    </AuthenticatedRoute>
  );
}
