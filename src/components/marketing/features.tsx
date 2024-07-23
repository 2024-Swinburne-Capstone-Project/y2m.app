import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { homeConfig } from '@/config/marketing/home';

export function Features() {
  const { features } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{features.title}</h2>
      <div className="grid gap-8 text-center md:grid-cols-4">
        <AnimatePresence>
          {features.items.map((feature, index) => (
            <motion.div
              key={feature.title.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6"
            >
              <Image
                src={feature.imagePath}
                alt=""
                width={300}
                height={300}
                className="h-auto w-full object-cover dark:overflow-hidden dark:rounded-full dark:bg-foreground"
              />
              <h3 className="mb-2 text-xl font-semibold">{feature.title.text}</h3>
              <p className="text-muted-foreground">{feature.description.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
