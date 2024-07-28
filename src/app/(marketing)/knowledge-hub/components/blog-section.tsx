'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogsCarousel } from './blogs-carousel';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogSectionProps {
  blogs: BlogPost[];
  isLoading: boolean;
  error: Error | null;
}

export const BlogSection = ({ blogs, isLoading, error }: BlogSectionProps) => {
  return (
    <div>
      <Card>
        {/* TODO: Add a validation that this button only shows if an authorized user is logged in */}
        <div className="mr-4 mt-4 flex justify-end">
          <Link
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="/knowledge-hub/blog-editor"
          >
            Add New Blog
          </Link>
        </div>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          ) : error ? (
            <div>Error loading blog posts: {error.message}</div>
          ) : (
            <BlogsCarousel blogs={blogs} isLoading={isLoading} error={error} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
