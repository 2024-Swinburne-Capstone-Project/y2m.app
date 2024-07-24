import { BlogsCarousel } from '@/app/(marketing)/knowledge-hub/components/blogs-carousel';
import { AnimatePresence, motion } from 'framer-motion';
import { BlogPost } from '@/types';

interface HomeBlogsProps {
  blogs: BlogPost[];
  isLoading: boolean;
  error: Error | null;
}

export function HomeBlogs({ blogs, isLoading, error }: HomeBlogsProps) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">Blogs</h2>
      <div className="grid gap-8 text-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border p-6"
          >
            <BlogsCarousel blogs={blogs} isLoading={isLoading} error={error} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
