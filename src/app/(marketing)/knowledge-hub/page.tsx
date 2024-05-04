'use client';
import { useState } from 'react';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoSection } from './components/video-section';
import { BlogSection } from './components/blog-section';
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Title from '@/components/title';
import Image from 'next/image';

export default function KnowledgeHubPage() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody className="space-y-6">
          <div className=" space-y-6">
            <Title>{knowledgeHubConfig.heroSection.title.text}</Title>
          </div>
          <div>
            <Image
              src={knowledgeHubConfig.heroSection.imagePath}
              alt={knowledgeHubConfig.heroSection.title.text}
              width={300}
              height={300}
              className="dark:rounded-full dark:bg-foreground"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <Tabs defaultValue="videos" className="mx-auto mb-10 max-w-7xl px-6">
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
