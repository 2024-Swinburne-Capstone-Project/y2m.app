import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { homeConfig } from '@/config/marketing/home';

export function Perks() {
  const { perks } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{perks.title}</h2>
      <div className="grid gap-8 text-center md:grid-cols-3">
        <AnimatePresence>
          {perks.items.map((perk, index) => (
            <motion.div
              key={perk.title.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6"
            >
              <Image
                src={perk.imagePath}
                alt=""
                width={300}
                height={300}
                className="h-auto w-full object-cover dark:overflow-hidden dark:rounded-full dark:bg-foreground"
              />
              <h3 className="mb-2 text-xl font-semibold">{perk.title.text}</h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
