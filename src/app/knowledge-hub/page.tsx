'use client';
import HeroSection from '@/components/hero-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { useState } from 'react';
import { BlogsCarousel } from './components/blogs-carousel';

export default function KnowledgeHubPage() {
  const [isVideos, setIsVideos] = useState(true);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const toggleConfig = (videos: boolean) => {
    setIsVideos(videos);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={knowledgeHubConfig.heroSection.title}
        imagePath={knowledgeHubConfig.heroSection.imagePath}
        className="bg-secondary"
      />
      <div className="flex justify-center items-center mt-8 mb-12">
        <button
          onClick={() => toggleConfig(true)}
          className={`px-6 py-2 rounded-l-full ${
            isVideos
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => toggleConfig(false)}
          className={`px-6 py-2 rounded-r-full ${
            !isVideos
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
          }`}
        >
          Blogs
        </button>
      </div>
      {isVideos && (
        <div className="flex justify-center">
          <Card className="w-[90vw]">
            <CardHeader>
              <CardTitle>Videos</CardTitle>
              <CardDescription>Playlist ({knowledgeHubConfig.videos.length})</CardDescription>
            </CardHeader>
            <div className="flex">
              <CardContent className="grid gap-4">
                {knowledgeHubConfig.videos.map((video, index) => (
                  <div
                    key={index}
                    className={`grid p-5 cursor-pointer ${
                      selectedVideoIndex == index ? 'bg-secondary' : ''
                    }`}
                    onClick={() => setSelectedVideoIndex(index)}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{video.title}</p>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardContent>
                {selectedVideoIndex !== null && (
                  <iframe
                    width="750"
                    height="422"
                    src={knowledgeHubConfig.videos[selectedVideoIndex].embeddingLink}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
              </CardContent>
            </div>
          </Card>
        </div>
      )}
      {!isVideos && (
        <div className="flex justify-center">
          <Card className="w-[90vw]">
            <CardHeader>
              <CardTitle>Blogs</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <BlogsCarousel slides={knowledgeHubConfig.carouselSlides} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
