'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogsCarousel } from './blogs-carousel';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const BlogSection = () => {
  const router = useRouter();

  return (
    <div>
      <Card>
        {/* TODO: Add a validation that this button only shows if an authorized user is logged in */}
        <div className="mr-4 mt-4 flex justify-end">
          <Button onClick={() => router.push('/knowledge-hub/blog-editor')}>Add New Blog</Button>
        </div>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogsCarousel />
        </CardContent>
      </Card>
    </div>
  );
};
