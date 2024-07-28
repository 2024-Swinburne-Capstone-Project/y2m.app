import { AnimatePresence, motion } from 'framer-motion';
import { homeConfig } from '@/config/marketing/home';

export function IntroVideo() {
  const { introVideo } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{introVideo.title}</h2>
      <div className="grid gap-8 text-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border p-6"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="size-full"
                style={{ aspectRatio: '16/9' }}
                src={introVideo.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
