'use client';

import { useState } from 'react';
import { knowledgeHubConfig } from '@/config/marketing/knowledge-hub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoSection } from './components/video-section';
import { BlogSection } from './components/blog-section';
import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import Title from '@/components/common/title';
import Image from 'next/image';
import { useBlogPosts } from '@/hooks/useBlogData';
import { useVideos } from '@/hooks/useVideoData';
import { useProfile } from '@/hooks/useProfile';

export default function KnowledgeHubPage() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const { data: blogs, isLoading, error } = useBlogPosts();
  const { data: videos, isLoading: isVideosLoading, error: videosError } = useVideos();
  const { profile } = useProfile();
  const isAdmin = profile?.user.role.toString() === 'ADMIN';

  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody className="space-y-6">
          <div className="space-y-6">
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
            videos={videos || []}
            isLoading={isVideosLoading}
            error={videosError}
            selectedVideoIndex={selectedVideoIndex}
            setSelectedVideoIndex={setSelectedVideoIndex}
            isAdmin={isAdmin}
          />
        </TabsContent>
        <TabsContent value="blog">
          <BlogSection blogs={blogs || []} isLoading={isLoading} error={error} isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
