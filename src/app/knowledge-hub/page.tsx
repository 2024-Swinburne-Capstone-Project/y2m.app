'use client';
import { useState } from 'react';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoSection } from './components/video-section';
import { BlogSection } from './components/blog-section';
import { HeroSection } from './components/hero-section';

export default function KnowledgeHubPage() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={knowledgeHubConfig.heroSection.title}
        imagePath={knowledgeHubConfig.heroSection.imagePath}
      />
      <Tabs defaultValue="videos" className="max-w-7xl mb-10 mx-auto px-2">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <VideoSection
            videos={knowledgeHubConfig.videos}
            selectedVideoIndex={selectedVideoIndex}
            setSelectedVideoIndex={setSelectedVideoIndex}
          />
        </TabsContent>
        <TabsContent value="blog">
          <BlogSection carouselSlides={knowledgeHubConfig.carouselSlides} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
