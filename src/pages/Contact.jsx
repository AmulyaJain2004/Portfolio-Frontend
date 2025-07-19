import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => (
  <>
    <Navbar />
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-3xl font-bold text-indigo-700 dark:text-yellow-200 mb-4 text-center"
      >
        Contact
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="text-gray-600 dark:text-gray-300 text-lg text-center"
      >
        Contact form and details will appear here soon.
      </motion.p>
    </main>
    <Footer />
  </>
);

export default Contact; 