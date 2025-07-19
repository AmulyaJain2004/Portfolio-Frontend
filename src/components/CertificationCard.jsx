import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';

const CertificationCard = React.memo(({ certification }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center gap-2 mb-1">
      <FaCertificate className="text-indigo-500 dark:text-yellow-200" />
      <span className="font-semibold text-indigo-700 dark:text-yellow-200">{certification.title}</span>
    </div>
    <span className="text-gray-500 text-xs">{certification.issuer}</span>
    <span className="text-gray-400 text-xs">{certification.date}</span>
  </motion.div>
));

export default CertificationCard; 