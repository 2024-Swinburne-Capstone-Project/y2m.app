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
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Videos</CardTitle>
          <CardDescription>Playlist ({videos.length})</CardDescription>
        </CardHeader>
        <MainSection className="flex flex-col md:flex-row">
          <CardContent className="md:w-1/3">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`p-5 cursor-pointer ${selectedVideoIndex === index ? 'bg-secondary' : ''}`}
                onClick={() => setSelectedVideoIndex(index)}
              >
                <div>
                  <p className="font-medium leading-none">{video.title}</p>
                  <p className="text-muted-foreground">{video.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardContent className="md:w-2/3" style={{margin: 0}}>
            {selectedVideoIndex !== null && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-full"
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