'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogsCarousel } from './blogs-carousel';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface BlogSectionProps {
  blogs: BlogPost[];
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
}

export const BlogSection = ({ blogs, isLoading, error, isAdmin }: BlogSectionProps) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Blogs</CardTitle>
          {isAdmin && (
            <Button asChild>
              <Link href="/knowledge-hub/blog-editor">Add New Blog</Link>
            </Button>
          )}
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
