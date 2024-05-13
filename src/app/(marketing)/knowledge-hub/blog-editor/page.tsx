'use client';
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
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const formSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5),
    imagePath: z.string(),
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

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const addImage = () => {
    if (imageURL) {
      console.log(imageURL);
    }
    setShowImageDialog(false);
  };

  function onSumbit(values: z.infer<typeof formSchema>) {
    //Save values to the database
    const blog = {
      id: 0, //TODO: get the id of the last blog and increment it by 1
      title: values.title,
      content: values.description,
      timeStamp: Date.now(), //TODO: fix date
      author: 'admin', //TODO: Change to logged in user
      imagePath: imageURL,
    };
    console.log({ blog });
    //redirect to a new page with the new blog retrieved from the db
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col px-4 py-12 md:flex-col md:space-x-6 md:px-8 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imageURL && !showImageDialog ? (
            <div>
              <Button className="gap-2" variant="secondary" onClick={() => setImageURL('')}>
                Remove Image
              </Button>
              <img src={imageURL} alt="New Image" />
            </div>
          ) : (
            <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2" variant="secondary">
                  Add Image
                  <Image className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Image</DialogTitle>
                  <DialogDescription>
                    Enter the URL for the image you want added to this blog
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center pt-4 gap-3">
                  <Label htmlFor="image-url">URL:</Label>
                  <Input
                    id="image-url"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </div>
                <img src={imageURL} alt="New Image" />
                <DialogFooter>
                  <Button onClick={addImage}>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Post</FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
