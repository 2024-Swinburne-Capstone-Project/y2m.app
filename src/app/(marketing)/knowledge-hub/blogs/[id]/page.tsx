'use client';
import { faCalendarDays, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import TextWithIcon from '@/components/marketing/text-with-icon';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { useSearchParams } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from 'next/image';
import NextLink from 'next/link';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    return;
  }

  const blog = knowledgeHubConfig.carouselSlides.find((x) => x.id === parseInt(id));

  if (!blog) {
    return;
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [1],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc m-4 ps-10',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal m-4 ps-10',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'underline cursor-pointer text-primary',
        },
      }),
    ],
    content: blog.content.text,
    editorProps: {
      attributes: {
        class: 'flex flex-col',
      },
    },
    editable: false,
  });

  const dateString = blog.date.toLocaleDateString('en-AU');
  const timeString = blog.date.toLocaleString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 py-12 md:flex-col md:space-x-6 md:px-8 space-y-6">
      <div className="flex justify-start">
        <NextLink
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="/knowledge-hub"
        >
          Back
        </NextLink>
      </div>
      <Image src={blog.imagePath} alt={blog.title.text} width={1280} height={300} />
      <div className="py-10 text-3xl font-bold text-center">{blog.title.text}</div>
      <EditorContent editor={editor} />
      <div className="flex gap-5">
        <TextWithIcon text={blog.author.text} icon={faUser} />
        <TextWithIcon text={dateString} icon={faCalendarDays} />
        <TextWithIcon text={timeString} icon={faClock} />
      </div>
    </div>
  );
}
