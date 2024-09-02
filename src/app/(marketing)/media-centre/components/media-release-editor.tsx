import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  href: z.string().min(1, { message: 'Link is required' }),
});

export function MediaReleaseEditor({
  mutate,
  useMediaReleases,
}: {
  mutate: any;
  useMediaReleases: any;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePath, setImagePath] = React.useState<string>('/y2m-logo.png');

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
  );
}
