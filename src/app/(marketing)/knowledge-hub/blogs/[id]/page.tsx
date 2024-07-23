'use client';

import { faCalendarDays, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import TextWithIcon from '@/components/marketing/text-with-icon';
import { useSearchParams } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useBlogPost } from '@/hooks/useBlogData';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const router = useRouter();

  const { data: blog, isLoading, error } = useBlogPost(id);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: 'text-xl font-bold',
            levels: [1],
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc m-4 ps-10',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal m-4 ps-10',
          },
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'underline cursor-pointer text-primary',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'flex flex-col',
      },
    },
    editable: false,
  });

  useEffect(() => {
    if (blog) {
      editor?.commands.setContent(blog.content);
    }
  }, [blog, editor]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const date = new Date(blog.date.toString());
  const dateString = date.toLocaleDateString('en-AU');
  const timeString = date.toLocaleString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-6 px-4 py-12 md:flex-col md:space-x-6 md:px-8">
      <div className="flex justify-start">
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <Image src={blog.imagePath} alt={blog.title} width={1280} height={300} />
      <div className="py-10 text-center text-3xl font-bold">{blog.title}</div>
      <EditorContent editor={editor} />
      <div className="flex gap-5">
        <TextWithIcon text={blog.author} icon={faUser} />
        <TextWithIcon text={dateString} icon={faCalendarDays} />
        <TextWithIcon text={timeString} icon={faClock} />
      </div>
    </div>
  );
}
