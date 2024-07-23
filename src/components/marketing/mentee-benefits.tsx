import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { homeConfig } from '@/config/marketing/home';

export function MenteeBenefits() {
  const { menteeBenefits } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{menteeBenefits.title}</h2>
      <div className="grid gap-8 text-center md:grid-cols-2">
        <AnimatePresence>
          {menteeBenefits.items.map((benefit, index) => (
            <motion.div
              key={benefit.description.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-row items-center gap-8 rounded-lg border p-6 text-left"
            >
              <Image
                src={benefit.imagePath}
                alt=""
                width={300}
                height={300}
                className="h-auto w-28 basis-1/5 object-cover dark:overflow-hidden dark:rounded-full dark:bg-foreground"
              />
              <div className="basis-4/5">
                <h1 className="mb-2 text-xl font-semibold">{benefit.title.text}</h1>
                <h3 className="text-muted-foreground">{benefit.description.text}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
