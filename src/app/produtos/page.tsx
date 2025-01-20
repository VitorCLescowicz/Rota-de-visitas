"use client"

import { useState } from 'react';
import VideoContainer from '@/components/VideoContainer';
import { motion } from 'framer-motion';

interface ProductCard {
  id: number;
  title: string;
  image: string;
  video: string;
  imagePosition: string;
}

const productCards: ProductCard[] = [
  {
    id: 1,
    title: 'DRIVES PEQUENOS',
    image: '/ROTEIRO/projeto/imagens/pequenos.PNG',
    video: '/ROTEIRO/projeto/videos/LIM Montagem1.mp4',
    imagePosition: '-3px'
  },
  {
    id: 2,
    title: 'DRIVES ',
    image: '/ROTEIRO/projeto/imagens/medios.PNG',
    video: '/ROTEIRO/projeto/videos/M30_2.mp4',
    imagePosition: '-20px'
  },
  {
    id: 3,
    title: 'DRIVES GRANDES',
    image: '/ROTEIRO/projeto/imagens/grandes.PNG',
    video: '/ROTEIRO/projeto/videos/G5.1.mp4',
    imagePosition: '-21px'
  },
  {
    id: 4,
    title: 'PRODUTOS DE SEGURANÇA',
    image: '/ROTEIRO/projeto/imagens/seguranca.PNG',
    video: '/ROTEIRO/projeto/videos/Sensores8.mp4',
    imagePosition: '-21px'
  },
  {
    id: 5,
    title: 'LINHA POWER',
    image: '/ROTEIRO/projeto/imagens/power.PNG',
    video: '/ROTEIRO/projeto/videos/Nobreak.mp4',
    imagePosition: '-21px'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProductsPage() {
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

  const ProductCardComponent = ({ card }: { card: ProductCard }) => {
    const extraOffset = 20;
    const finalPosition =
      card.id === 1
        ? card.imagePosition
        : `${parseInt(card.imagePosition, 10) + extraOffset}px`;

    return (
      <motion.div
        variants={itemVariants}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div
          onClick={() => openVideo(card.video, card.title)}
          className="cursor-pointer relative overflow-hidden rounded-xl shadow-lg border-2 border-white/10 group-hover:border-white/30 transition-all duration-300"
        >
          <div className="relative h-48">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-contain transition-transform duration-500"
              style={{ transform: `translateY(${finalPosition})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/20 group-hover:from-black/70 group-hover:to-black/30 transition-all duration-300" />
          </div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-white font-medium text-lg bg-white/10 py-2 px-4 rounded-lg backdrop-blur-sm inline-block">
            {card.title}
          </h3>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/ROTEIRO/projeto/imagens/bg.png')" }}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="h-[85vh] w-[95%] max-w-[1800px] flex flex-col justify-between py-4"
      >
        <div className="flex justify-between gap-8 h-1/3">
          <div className="w-1/2">
            <ProductCardComponent card={productCards[0]} />
          </div>
          <div className="w-1/2">
            <ProductCardComponent card={productCards[1]} />
          </div>
        </div>

        <div className="flex justify-center h-1/3">
          <div className="w-1/2">
            <ProductCardComponent card={productCards[2]} />
          </div>
        </div>

        <div className="flex justify-between gap-8 h-1/3">
          <div className="w-1/2">
            <ProductCardComponent card={productCards[3]} />
          </div>
          <div className="w-1/2">
            <ProductCardComponent card={productCards[4]} />
          </div>
        </div>
      </motion.div>

      <VideoContainer 
        isOpen={isVideoOpen}
        videoUrl={videoInfo.url}
        title={videoInfo.title}
        onClose={closeVideo}
      />
    </div>
  );
}