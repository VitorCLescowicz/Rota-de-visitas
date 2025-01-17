'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoContainer from '@/components/VideoContainer';
import { motion } from 'framer-motion';

const processCards = [
  {
    id: 1,
    title: 'IMPRESSÃO DE PASTA DE SOLDA',
    image: '/ROTEIRO/projeto/imagens/printerhj.png',
    video: '/ROTEIRO/projeto/videos/Printer.mp4',
  },
  {
    id: 2,
    title: 'INSPEÇÃO DE PASTA DE SOLDA(SPI)',
    image: '/ROTEIRO/projeto/imagens/spiaio.png',
    video: '/ROTEIRO/projeto/videos/SPI2.mp4',
  },
  {
    id: 3,
    title: 'INSERSORA',
    image: '/ROTEIRO/projeto/imagens/insersorahj.png',
    video: '/ROTEIRO/projeto/videos/Insersora4.mp4',
  },
  {
    id: 4,
    title: 'FORNO DE REFUSÃO',
    image: '/ROTEIRO/projeto/imagens/fornohj.png',
    video: '/ROTEIRO/projeto/videos/Forno9.mp4',
  },
  {
    id: 5,
    title: 'INSPEÇÃO ÓTICA(AOI)',
    image: '/ROTEIRO/projeto/imagens/spiaio.png',
    video: '/ROTEIRO/projeto/videos/AOI.mp4',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProcessosPage() {
  const [videoInfo, setVideoInfo] = useState({ url: '', title: '' });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = (url: string, title: string) => {
    setVideoInfo({ url, title });
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setVideoInfo({ url: '', title: '' });
    setIsVideoOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4">
      <div className="w-[98%] max-w-[1600px]">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-5 gap-4 mb-8"
        >
          {processCards.map((card) => (
            <motion.div 
              key={card.id}
              variants={item}
              className="flex flex-col items-center"
            >
              <div 
                className="w-full cursor-pointer"
                onClick={() => openVideo(card.video, card.title)}
              >
                <div className="relative w-full pb-[120%]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain rounded-lg hover:scale-105 transition-transform duration-200"
                    priority
                  />
                </div>
                <h4 className="text-base font-medium mt-2 text-center">
                  {card.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative w-full pb-[25%] max-h-[400px]">
          <Image
            src="/ROTEIRO/projeto/imagens/image (1).png"
            alt="Imagem Larga"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <VideoContainer 
        isOpen={isVideoOpen}
        videoUrl={videoInfo.url}
        title={videoInfo.title}
        onClose={closeVideo}
      />
    </div>
  );
}