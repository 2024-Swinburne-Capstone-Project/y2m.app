import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogsCarousel } from './blogs-carousel';
import Link from 'next/link';

export const BlogSection = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-[90vw]">
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
        <CardContent className="flex justify-center">
          <BlogsCarousel />
        </CardContent>
      </Card>
    </div>
  );
};
