"use client";
import { BlogsConfig } from "@/types";
import Image from "next/image";
import {
  faCalendarDays,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import TextWithIcon from "@/components/text-with-icon";

export default function BlogPage({ blog }: { blog: BlogsConfig }) {
  const dateString = blog.date.toLocaleDateString("en-AU");
  const timeString = blog.date.toLocaleString("en-AU", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="w-[60vw]">
      <Image
        src={blog.imagePath}
        alt={blog.title}
        width={1280}
        height={300}
        className="w-full h-auto object-cover"
      />
      <p className="text-3xl font-bold py-10">{blog.title}</p>
      <div className="text-justify whitespace-break-spaces">{blog.content}</div>
      <div className="flex gap-5">
        <TextWithIcon text={blog.author} icon={faUser} />
        <TextWithIcon text={dateString} icon={faCalendarDays} />
        <TextWithIcon text={timeString} icon={faClock} />
      </div>
    </div>
  );
}
