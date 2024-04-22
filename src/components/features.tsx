import { AnimatePresence, motion } from "framer-motion";

const features = [
  {
    title: "Personalized Mentorship",
    description:
      "Get matched with mentors who align with your goals and aspirations.",
  },
  {
    title: "Collaborative Learning",
    description:
      "Engage in interactive sessions and learn from experienced professionals.",
  },
  {
    title: "Goal Tracking",
    description:
      "Set goals, track your progress, and celebrate your achievements.",
  },
];

export function Features() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">Features</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <AnimatePresence>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6"
            >
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}