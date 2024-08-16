import React from 'react';
import { motion } from 'framer-motion';
import { mentorSearchConfig } from '@/config/application/mentor-search';

const HeroSection: React.FC = () => {
  const { heroSection } = mentorSearchConfig;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight">{heroSection.title}</h1>
      <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{heroSection.subtitle}</p>
    </motion.div>
  );
};

export default HeroSection;
