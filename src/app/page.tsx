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
      {/* Background Container com Animação */}
      <motion.div 
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
        style={{
          top: '50px',
          backgroundImage: "url('/BemVindo.png')",
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content Container com Animação em Cascade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute inset-0 flex flex-col justify-center items-center"
        style={{ top: '80px' }}
      >
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-5xl md:text-6xl lg:text-7xl text-white font-bold text-center"
        >
          BEM VINDO!
        </motion.h1>
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl text-white font-medium text-center mt-4"
        >
          DEPARTAMENTO PRODUÇÃO DRIVES
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}
