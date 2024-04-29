'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Features } from '@/components/features';
import { Testimonials } from '@/components/testimonials';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <Title className="mb-4 text-4xl font-bold md:text-6xl">
              <>
                <span className="text-primary">Unlock</span> Your Potential with You2Mentor
              </>
            </Title>
            <Subtitle className="mb-8 text-lg text-muted-foreground md:text-xl">
              Connect with experienced mentors and achieve your goals faster.
            </Subtitle>
          </motion.section>
          <Features />
          <Testimonials />
        </AnimatePresence>
      </main>
    </div>
  );
}
