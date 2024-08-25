'use client';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { getYoutubeEmbedUrl } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';
import NotAuthorizedPage from '@/app/not-authorized';

export default function Home() {
  const formSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5),
    link: z.string().min(5),
    videoLength: z.string().min(3),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      link: '',
      videoLength: '',
    },
  });

  const router = useRouter();

  const { profile } = useProfile();
  const isAdmin = profile?.user.role.toString() === 'ADMIN';

  if (!isAdmin) {
    return <NotAuthorizedPage />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Save values to the database
    const video = {
      title: values.title,
      description: values.description,
      embeddingLink: getYoutubeEmbedUrl(values.link),
      videoLength: values.videoLength,
    };

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      });

      if (!response.ok) {
        throw new Error('Failed to save video');
      }

      const data = await response.json();
      router.back();
      toast({
        title: 'Video saved successfully',
      });
      return data;
    } catch (error) {
      console.error('Error saving video:', error);
      throw error;
    }
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col space-y-6 px-4 py-12 md:flex-col md:space-x-6 md:px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>
                  Title <span className="text-red-600"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Video Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Video Description <span className="text-red-600"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Video Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Youtube Video Link <span className="text-red-600"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://www.youtube.com/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Length of the Video <span className="text-red-600"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="2:45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-4" type="submit" disabled={!form.formState.isValid}>
            Submit
          </Button>
          <Button className="mx-3 my-4" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </form>
      </Form>
    </main>
  );
}
