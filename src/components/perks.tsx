import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const perks = [
  {
    title: 'Free to Use',
    imagePath: '/work-from-home.svg',
  },
  {
    title: 'Learn from Industry Professionals',
    imagePath: '/businessman-with-a-suitcase.svg',
  },
  {
    title: 'Mentor Others',
    imagePath: '/creative-work.svg',
  },
];

export function Perks() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">What Do We Offer?</h2>
      <div className="grid gap-8 md:grid-cols-3 text-center">
        <AnimatePresence>
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
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
                className="w-full h-auto object-cover"
              />
              <h3 className="mb-2 text-xl font-semibold">{perk.title}</h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
