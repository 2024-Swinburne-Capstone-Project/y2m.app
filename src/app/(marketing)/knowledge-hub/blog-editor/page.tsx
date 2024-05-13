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

export default function Home() {
  const formSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSumbit(values: z.infer<typeof formSchema>) {
    //Add the logged in username
    //Save the timestamp of the submission
    //Save values to the database
    console.log({ values });
    //redirect to a new page with the new blog retrieved from the db
  }

  return (
    <main className="p-24">
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
