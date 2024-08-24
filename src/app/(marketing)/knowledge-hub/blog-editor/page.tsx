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
import Tiptap from '@/components/marketing/tiptap';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';
import NotAuthorizedPage from '@/app/not-authorized';

export default function Home() {
  const formSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5),
    imagePath: z.string().url(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      imagePath: '',
    },
  });

  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageURL = form.getValues('imagePath');

  function isValidURL(url: string) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (imageURL) {
      if (!isValidURL(imageURL)) {
        form.setError('imagePath', {
          type: 'manual',
          message: 'Please enter a valid URL',
        });
      } else {
        setImagePreview(imageURL);
      }
    }
  }, [form, imageURL]);

  function clearImage() {
    setImagePreview(null);
    form.setValue('imagePath', '');
  }

  const { profile } = useProfile();
  const isAdmin = profile?.user.role.toString() === 'ADMIN';

  if (!isAdmin) {
    return <NotAuthorizedPage />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Save values to the database
    const blog = {
      title: values.title,
      content: values.description,
      author: 'admin', // TODO: Change to logged in user
      imagePath: values.imagePath,
    };

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      const data = await response.json();
      router.back();
      toast({
        title: 'Blog post saved successfully',
      });
      return data;
    } catch (error) {
      console.error('Error saving blog post:', error);
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
                  <Input placeholder="Blog Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imagePreview ? (
            <div className="flex flex-col items-start gap-3">
              <Image src={imagePreview} alt="New Image" width="250" height="250" />

              <Button className="gap-2" variant="secondary" onClick={() => clearImage()}>
                Remove Image
              </Button>
            </div>
          ) : (
            <FormField
              control={form.control}
              name="imagePath"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>
                    Image URL <span className="text-red-600"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Paste the URL of the image you want to add to the blog post"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Blog Post <span className="text-red-600"> *</span>
                </FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
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
