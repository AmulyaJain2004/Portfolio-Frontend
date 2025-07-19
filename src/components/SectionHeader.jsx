import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = React.memo(({ title }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.7 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="text-2xl sm:text-3xl font-bold text-center mb-6 text-indigo-700 dark:text-yellow-200 tracking-tight"
  >
    {title}
  </motion.h2>
));

export default SectionHeader; 