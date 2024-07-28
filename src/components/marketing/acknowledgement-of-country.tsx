import { AnimatePresence, motion } from 'framer-motion';
import { homeConfig } from '@/config/marketing/home';

export function AcknowledgementOfCountry() {
  const { acknowledgementOfCountry } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{acknowledgementOfCountry.title}</h2>
      <div className="text-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-8 rounded-lg border p-6 text-left"
          >
            <h3 className="text-muted-foreground">{acknowledgementOfCountry.text}</h3>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
