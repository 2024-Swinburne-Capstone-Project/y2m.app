import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogsCarousel } from './blogs-carousel';
import { BlogsConfig } from '@/types';

interface BlogSectionProps {
  carouselSlides: BlogsConfig[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ carouselSlides }) => {
  return (
    <div className="flex justify-center">
      <Card className="w-[90vw]">
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <BlogsCarousel slides={carouselSlides} />
        </CardContent>
      </Card>
    </div>
  );
};
