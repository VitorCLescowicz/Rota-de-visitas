'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoContainerProps {
  isOpen: boolean;
  videoUrl: string;
  title?: string;
  onClose: () => void;
}

const VideoContainer: FC<VideoContainerProps> = ({ 
  isOpen, 
  videoUrl, 
  title,
  onClose 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div 
            className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
          >
            {title && (
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white text-2xl font-bold mb-4 text-center"
              >
                {title}
              </motion.h2>
            )}
            
            <button 
              onClick={onClose}
              className="absolute -top-8 right-0 text-white text-2xl cursor-pointer hover:text-gray-300 z-50"
              aria-label="Close video"
            >
              X
            </button>

            <motion.div 
              className="relative w-full h-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <video 
                src={videoUrl} 
                className="absolute inset-0 w-full h-full"
                autoPlay
                loop
                playsInline
                muted
                controls
              >
                <source src={videoUrl} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoContainer;