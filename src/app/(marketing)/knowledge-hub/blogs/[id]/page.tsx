'use client';
import { faCalendarDays, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import TextWithIcon from '@/components/marketing/text-with-icon';
import { useSearchParams } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { BlogsConfig } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;

  const [blog, setBlog] = useState<BlogsConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();

        if (data) {
          const fetchedBlog: BlogsConfig = {
            id: data.id,
            title: {
              text: data.title,
            },
            content: {
              text: data.content,
            },
            imagePath: data.imagePath,
            author: {
              text: data.author,
            },
            date: new Date(data.date),
          };

          setBlog(fetchedBlog);
        }
      } catch {
        console.error('Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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
      editor?.commands.setContent(blog.content.text);
    }
  }, [blog, editor]);

  if (isLoading || !blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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

  const dateString = blog.date.toLocaleDateString('en-AU');
  const timeString = blog.date.toLocaleString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-6 px-4 py-12 md:flex-col md:space-x-6 md:px-8">
      <div className="flex justify-start">
        <NextLink
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="/knowledge-hub"
        >
          Back
        </NextLink>
      </div>
      <Image src={blog.imagePath} alt={blog.title.text} width={1280} height={300} />
      <div className="py-10 text-center text-3xl font-bold">{blog.title.text}</div>
      <EditorContent editor={editor} />
      <div className="flex gap-5">
        <TextWithIcon text={blog.author.text} icon={faUser} />
        <TextWithIcon text={dateString} icon={faCalendarDays} />
        <TextWithIcon text={timeString} icon={faClock} />
      </div>
    </div>
  );
}
