import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainSection from '@/components/main-section';
import { VideoConfig } from '@/types';

interface VideoSectionProps {
  videos: VideoConfig[];
  selectedVideoIndex: number;
  setSelectedVideoIndex: (index: number) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  videos,
  selectedVideoIndex,
  setSelectedVideoIndex,
}) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Videos</CardTitle>
          <CardDescription>Playlist ({videos.length})</CardDescription>
        </CardHeader>
        <MainSection className="flex flex-col py-4 md:flex-row">
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
