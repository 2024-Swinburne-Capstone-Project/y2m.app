'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { useState } from 'react';
import { BlogsCarousel } from './components/blogs-carousel';
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import Title from '@/components/title';

export default function KnowledgeHubPage() {
  const [isVideos, setIsVideos] = useState(true);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const toggleConfig = (videos: boolean) => {
    setIsVideos(videos);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody>
          <div className="md:w-1/2 space-y-6">
            <Title>{knowledgeHubConfig.heroSection.title}</Title>
          </div>
          <div className="md:w-1/2">
            <Image
              src={knowledgeHubConfig.heroSection.imagePath}
              alt={knowledgeHubConfig.heroSection.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <div className="flex justify-center items-center mt-8 mb-12 max-w-7xl mx-auto">
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
        <div className="flex justify-center max-w-7xl mx-auto">
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
