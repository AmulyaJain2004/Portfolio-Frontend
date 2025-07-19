import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    className="w-full py-4 flex justify-center items-center bg-black border-t border-gray-700"
  >
    <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Amulya Jain. All rights reserved.</span>
  </motion.footer>
);

export default Footer; 