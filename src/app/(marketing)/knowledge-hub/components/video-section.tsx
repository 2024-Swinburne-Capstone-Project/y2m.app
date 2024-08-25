import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoConfig } from '@/types';
import { ErrorAlert } from '@/components/common/error-alert';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import MainSection from '@/components/common/main-section';

interface VideoSectionProps {
  videos: VideoConfig[];
  isLoading: boolean;
  error: Error | null;
  selectedVideoIndex: number;
  isAdmin: boolean;
  setSelectedVideoIndex: (index: number) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  videos,
  isLoading,
  error,
  selectedVideoIndex,
  isAdmin,
  setSelectedVideoIndex,
}) => {
  if (isLoading) {
    return (
      <LoadingSkeleton count={3} className="mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3" />
    );
  }

  if (error) {
    return <ErrorAlert message={`Error loading videos: ${error.message}`} />;
  }

  if (!videos || videos.length === 0) {
    return <ErrorAlert message="No videos available." />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Videos</CardTitle>
            <CardDescription>Playlist ({videos.length})</CardDescription>
          </div>
          {isAdmin && (
            <Button asChild>
              <Link href="/knowledge-hub/video-editor">Add New Video</Link>
            </Button>
          )}
        </CardHeader>
        <MainSection className="flex flex-col items-start py-4 md:flex-row">
          <CardContent className="md:w-1/3">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`cursor-pointer p-5 ${
                  selectedVideoIndex === index ? 'bg-secondary' : ''
                }`}
                onClick={() => setSelectedVideoIndex(index)}
              >
                <p className="font-medium leading-none">{video.title.text}</p>
                <p className="text-muted-foreground">{video.description.text}</p>
              </div>
            ))}
          </CardContent>
          <CardContent className="md:w-2/3" style={{ margin: 0 }}>
            {selectedVideoIndex !== null && videos[selectedVideoIndex] && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="size-full"
                  style={{ aspectRatio: '16/9' }}
                  src={videos[selectedVideoIndex].embeddingLink}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </CardContent>
        </MainSection>
      </Card>
    </div>
  );
};
