import { BlogsCarousel } from '@/app/(marketing)/knowledge-hub/components/blogs-carousel';
import { knowledgeHubConfig } from '@/config/knowledge-hub';
import { AnimatePresence, motion } from 'framer-motion';

export function HomeBlogs() {
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
            <BlogsCarousel slides={knowledgeHubConfig.carouselSlides} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
