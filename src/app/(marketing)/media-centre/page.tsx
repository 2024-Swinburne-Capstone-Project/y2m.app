'use client';
import React, { useState } from 'react';
import { mediaCentreConfig } from '@/config/marketing/media-centre';
import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import Title from '@/components/common/title';
import Image from 'next/image';
import Subtitle from '@/components/common/subtitle';
import { useMediaReleases } from '@/hooks/useMediaReleaseData';
import { MediaCarousel } from './components/media-carousel';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCreateMediaRelease } from '@/hooks/useMediaReleaseData';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  href: z.string().min(1, { message: 'Link is required' }),
});

export default function MediaCentrePage() {
  const { data: mediaReleases, isLoading, error } = useMediaReleases();
  const { mutate } = useCreateMediaRelease();
  const { profile } = useProfile();
  const isAdmin = profile?.user.role.toString() === 'ADMIN';
  const [imagePath, setImagePath] = React.useState<string>('/y2m-logo.png');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      href: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      title: values.title,
      description: values.description,
      href: values.href,
      imagePath: imagePath,
    });
    useMediaReleases();
    form.reset();
    setIsDialogOpen(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePath(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody className="space-y-6">
          <div className="space-y-6">
            <Title>{mediaCentreConfig.heroSection.title.text}</Title>
          </div>
          <div>
            <Image
              src={mediaCentreConfig.heroSection.imagePath}
              alt={mediaCentreConfig.heroSection.title.text}
              width={300}
              height={300}
              className="dark:rounded-full dark:bg-foreground"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <MainSection className="bg-secondary">
        <MainSectionBody>
          <div className="space-y-6">
            <Title>{mediaCentreConfig.additionalContent.title}</Title>
            <Subtitle>{mediaCentreConfig.additionalContent.subtitle}</Subtitle>
          </div>
        </MainSectionBody>
      </MainSection>

      {isAdmin && (
        <div className="flex flex-col items-end">
          <MainSection className="-mb-20 mr-20 pb-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Add New Media Release</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Media Release</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="href"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleImageChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {imagePath && imagePath != '/y2m-logo.png' && (
                      <Image
                        src={imagePath}
                        alt="Media Release Image"
                        width={150}
                        height={150}
                        className="mx-auto w-full px-5 pt-5 dark:bg-foreground"
                      />
                    )}
                    <DialogFooter className="pt-2">
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </MainSection>
        </div>
      )}
      <MediaCarousel error={error} isLoading={isLoading} mediaReleases={mediaReleases} />
    </div>
  );
}
