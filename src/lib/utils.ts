import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYoutubeEmbedUrl(url: string): string | null {
  // Example URL: https://www.youtube.com/watch?v=Iv41XbkORAA&ab_channel=You2Mentor
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?si=0TWReHSOKVsf5H8Q&rel=0`;
  }
  return null;
}
