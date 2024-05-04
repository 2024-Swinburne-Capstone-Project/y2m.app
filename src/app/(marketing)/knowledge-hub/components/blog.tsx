'use client';
import { BlogsConfig } from '@/types';
import Image from 'next/image';
import { faCalendarDays, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import TextWithIcon from '@/components/text-with-icon';

export default function BlogPage({ blog }: { blog: BlogsConfig }) {
  const dateString = blog.date.toLocaleDateString('en-AU');
  const timeString = blog.date.toLocaleString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="w-[60vw]">
      <Image
        src={blog.imagePath}
        alt={blog.title.text}
        width={1280}
        height={300}
        className="h-auto w-full object-cover"
      />
      <p className="py-10 text-3xl font-bold">{blog.title.text}</p>
      <div className="whitespace-break-spaces text-justify">{blog.content.text}</div>
      <div className="flex gap-5">
        <TextWithIcon text={blog.author.text} icon={faUser} />
        <TextWithIcon text={dateString} icon={faCalendarDays} />
        <TextWithIcon text={timeString} icon={faClock} />
      </div>
    </div>
  );
}
