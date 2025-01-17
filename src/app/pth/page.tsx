'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoContainer from '@/components/VideoContainer';
import { motion } from 'framer-motion';

interface ProcessCard {
  id: number;
  title: string;
  image: string;
  video: string;
}

interface ProcessCardProps {
  card: ProcessCard;
  onClick: () => void;
}

interface VideoInfo {
  url: string;
  title: string;
}

const processCards: Array<Array<ProcessCard>> = [
  // Primeira linha
  [
    {
      id: 1,
      title: 'INSERÇÃO MANUAL',
      image: '/ROTEIRO/projeto/imagens/manual.png',
      video: '/ROTEIRO/projeto/videos/PTH1.mp4',
    },
    {
      id: 2,
      title: 'SOLDA ONDA',
      image: '/ROTEIRO/projeto/imagens/onda.png',
      video: '/ROTEIRO/projeto/videos/Solda Onda.mp4',
    },
    {
      id: 3,
      title: 'PÓS-SOLDA',
      image: '/ROTEIRO/projeto/imagens/pos.png',
      video: '/ROTEIRO/projeto/videos/IPS5.mp4',
    },
    {
      id: 4,
      title: 'SOLDA SELETIVA',
      image: '/ROTEIRO/projeto/imagens/seletiva.png',
      video: '/ROTEIRO/projeto/videos/Seletiva2.mp4',
    },
    {
      id: 5,
      title: 'ICT',
      image: '/ROTEIRO/projeto/imagens/ict.png',
      video: '/ROTEIRO/projeto/videos/ICT1.mp4',
    },
  ],
  // Segunda linha (invertida)
  [
    {
      id: 6,
      title: 'EMBALAGEM',
      image: '/ROTEIRO/projeto/imagens/emb.png',
      video: '/ROTEIRO/projeto/videos/Separação de cartoes1.mp4',
    },
    {
      id: 7,
      title: 'ROUTER',
      image: '/ROTEIRO/projeto/imagens/router.png',
      video: '/ROTEIRO/projeto/videos/Router1.mp4',
    },
    {
      id: 8,
      title: 'VERNIZ',
      image: '/ROTEIRO/projeto/imagens/verniz.png',
      video: '/ROTEIRO/projeto/videos/Verniz4.mp4',
    },
    {
      id: 10,
      title: 'ROBO DE SOLDA',
      image: '/ROTEIRO/projeto/imagens/Imagem1.png',
      video: '/ROTEIRO/projeto/videos/Robo5.mp4',
    },
    {
      id: 9,
      title: 'FLYING PROBE',
      image: '/ROTEIRO/projeto/imagens/probe.png',
      video: '/ROTEIRO/projeto/videos/Fly Prob2.mp4',
    },
  ],
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const cardStyles = {
  wrapper: 'min-h-screen flex items-center justify-center bg-cover bg-center py-8',
  container: 'w-[98%] max-w-[1800px] flex flex-col items-center',
  row: 'flex items-center justify-center gap-8 w-full',
  card: 'relative group cursor-pointer transition-transform duration-300 hover:scale-105',
  imageContainer: 'relative w-full h-48 rounded-lg overflow-hidden',
  title: 'text-sm font-medium mt-2 text-white text-center',
  arrowContainer: 'w-16 flex items-center justify-center',
};

export default function PthPage() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({ url: '', title: '' });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = (url: string, title: string) => {
    setVideoInfo({ url, title });
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setVideoInfo({ url: '', title: '' });
    setIsVideoOpen(false);
  };

  const ArrowRight = () => (
    <div className={cardStyles.arrowContainer}>
      <div className="relative w-16 h-16">
        <Image
          src="/ROTEIRO/projeto/imagens/SETA.png"
          alt="Seta direita"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );

  const ArrowLeft = () => (
    <div className={cardStyles.arrowContainer}>
      <div className="relative w-16 h-16">
        <Image
          src="/ROTEIRO/projeto/imagens/setaesq.png"
          alt="Seta esquerda"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );

  const ProcessCard = ({ card, onClick }: ProcessCardProps) => (
    <motion.div variants={item} className="w-52">
      <div className={cardStyles.card} onClick={onClick}>
        <div className={cardStyles.imageContainer}>
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-contain"
            priority
          />
        </div>
        <h4 className={cardStyles.title}>{card.title}</h4>
      </div>
    </motion.div>
  );

  return (
    <div
      className={cardStyles.wrapper}
      style={{ backgroundImage: "url('/ROTEIRO/projeto/imagens/bg.png')" }}
    >
      <div className={cardStyles.container}>
        <div className="flex flex-col items-center w-full">
          {/* Primeira linha */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={cardStyles.row}
          >
            {processCards[0].map((card, index) => (
              <div key={card.id} className="flex items-center">
                <ProcessCard
                  card={card}
                  onClick={() => openVideo(card.video, card.title)}
                />
                {index < processCards[0].length - 1 && <ArrowRight />}
              </div>
            ))}
          </motion.div>

          {/* Exemplo de seta vertical (para baixo) manipulável */}
          <div className="relative w-full h-32 my-4">
            {/* Posicionamento absoluto por pixels */}
            <div 
              className="absolute" 
              style={{
                top: '30px',    // Ajuste a posição vertical em pixels
                right: '110px',  // Ajuste a posição horizontal em pixels (da direita para dentro)
                width: '64px',  // Largura da seta
                height: '64px', // Altura da seta
              }}
            >
              <Image
                src="/ROTEIRO/projeto/imagens/setaesq.png"
                alt="Seta para baixo"
                fill
                // Rotaciona 270 graus para apontar para baixo
                className="object-contain rotate-[270deg]"
                priority
              />
            </div>
          </div>

          {/* Segunda linha */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={cardStyles.row}
          >
            {processCards[1].map((card, index) => (
              <div key={card.id} className="flex items-center">
                <ProcessCard
                  card={card}
                  onClick={() => openVideo(card.video, card.title)}
                />
                {index < processCards[1].length - 1 && <ArrowLeft />}
              </div>
            ))}
          </motion.div>
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