import { AnimatePresence, motion } from 'framer-motion';

const acknowledgementOfCountry =
  'You2Mentor acknowledges Aboriginal and Torres Strait Islander peoples as the traditional custodians of our land – Australia. We pay our respect to them and their cultures and to the elders past, present and emerging. Wurundjeri Woi Wurrung and Bunurong Boon Wurrung peoples of the Eastern Kulin are the traditional custodians of the land on which You2Mentor office stands.';

export function AcknowledgementOfCountry() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">Acknowledgement of Country</h2>
      <div className="text-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-8 rounded-lg border p-6 text-left"
          >
            <h3 className="text-muted-foreground">{acknowledgementOfCountry}</h3>{' '}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
