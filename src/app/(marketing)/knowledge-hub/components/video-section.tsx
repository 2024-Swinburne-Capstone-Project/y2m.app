import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainSection from '@/components/main-section';
import { VideoConfig } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface VideoSectionProps {
  selectedVideoIndex: number;
  setSelectedVideoIndex: (index: number) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  selectedVideoIndex,
  setSelectedVideoIndex,
}) => {
  const [videos, setVideos] = useState<VideoConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        const formattedData = data.map((video: VideoConfig) => ({
          id: video.id,
          title: {
            text: video.title,
          },
          description: {
            text: video.description,
          },
          embeddingLink: video.embeddingLink,
          videoLength: video.videoLength,
        }));
        setVideos(formattedData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading || !videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center ">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Card>
        {/* TODO: Add a validation that this button only shows if an authorized user is logged in */}
        <div className="mr-4 mt-4 flex justify-end">
          <Link
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="/knowledge-hub/video-editor"
          >
            Add New Video
          </Link>
        </div>
        <CardHeader>
          <CardTitle>Videos</CardTitle>
          <CardDescription>Playlist ({videos.length})</CardDescription>
        </CardHeader>
        <MainSection className="flex flex-col items-start py-4 md:flex-row">
          <CardContent className="md:w-1/3">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`cursor-pointer p-5 ${selectedVideoIndex === index ? 'bg-secondary' : ''}`}
                onClick={() => setSelectedVideoIndex(index)}
              >
                <div>
                  <p className="font-medium leading-none">{video.title.text}</p>
                  <p className="text-muted-foreground">{video.description.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardContent className="md:w-2/3" style={{ margin: 0 }}>
            {selectedVideoIndex !== null && (
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
