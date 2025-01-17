'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  const pageVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 w-full h-full"
    >
      {/* Background Container with Animation */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }} // Aumentado o scale para zoom
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
        style={{
          top: '80px',
          backgroundImage: "url('/BemVindo.png')",
          backgroundSize: "130%", // Aumentado para 150%
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content Container with Staggered Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute inset-0 flex justify-center items-center"
        style={{ top: '80px' }}
      >
        {/* Optional content */}
        {/*
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center"
        >
          Bem-vindo!
        </motion.h1>
        */}
      </motion.div>
    </motion.div>
  );
}