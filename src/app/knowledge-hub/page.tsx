'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { useState } from 'react';
import { BlogsCarousel } from './components/blogs-carousel';
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import Title from '@/components/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function KnowledgeHubPage() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody className="space-y-6">
          <div className="md:w-1/2 space-y-6">
            <Title>{knowledgeHubConfig.heroSection.title}</Title>
          </div>
          <div className="md:w-1/2 dark:bg-primary-foreground dark:rounded-full dark:overflow-hidden max-w-sm">
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
      <Tabs defaultValue="videos" className="max-w-7xl mb-10 mx-auto pl-2 pr-2">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Videos</CardTitle>
                <CardDescription>Playlist ({knowledgeHubConfig.videos.length})</CardDescription>
              </CardHeader>
              <MainSection className="flex flex-col md:flex-row">
                <CardContent className="md:w-1/3">
                  {knowledgeHubConfig.videos.map((video, index) => (
                    <div
                      key={index}
                      className={`p-5 cursor-pointer ${
                        selectedVideoIndex === index ? 'bg-secondary' : ''
                      }`}
                      onClick={() => setSelectedVideoIndex(index)}
                    >
                      <div>
                        <p className="font-medium leading-none">{video.title}</p>
                        <p className="text-muted-foreground">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardContent className="md:w-2/3" style={{ margin: '0' }}>
                  {selectedVideoIndex !== null && (
                      <iframe
                        className="w-full h-full"
                        style={{ aspectRatio: '16/9' }}
                        src={knowledgeHubConfig.videos[selectedVideoIndex].embeddingLink}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                  )}
                </CardContent>
              </MainSection>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="blog">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
