'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VideoContainer from '@/components/VideoContainer';
import { motion } from 'framer-motion';

interface ProcessCard {
  id: number;
  title: string;
  image: string;
  video?: string;
  link?: string;
  isArrow?: boolean;
  arrowDirection?: 'right' | 'left';
  rotation?: number;
  position?: string;
}

// ------------------------------
// Cards
// ------------------------------

const cardAlmoxarifado: ProcessCard = {
  id: 1,
  title: 'ALMOXARIFADO',
  image: '/ROTEIRO/projeto/imagens/almox.jpg',
  video: '/ROTEIRO/projeto/videos/Almox1.mp4'
};

const cardCartoes: ProcessCard = {
  id: 3,
  title: 'MONTAGEM DE CARTÕES ELETRÔNICOS',
  image: '/ROTEIRO/projeto/imagens/montagemc.jpg',
  link: '/cartoeshub'
};

const cardProdutos: ProcessCard = {
  id: 5,
  title: 'MONTAGEM DE PRODUTOS',
  image: '/ROTEIRO/projeto/imagens/montagemp.jpg',
  link: '/produtos'
};

const cardEmbalagem: ProcessCard = {
  id: 8,
  title: 'EMBALAGEM',
  image: '/ROTEIRO/projeto/imagens/emb.jpg',
  video: '/ROTEIRO/projeto/videos/limemb2.mp4'
};

const cardTestes: ProcessCard = {
  id: 10,
  title: 'TESTES',
  image: '/ROTEIRO/projeto/imagens/teste2.jpg',
  link: '/testes'
};

const cardExpedicao: ProcessCard = {
  id: 6,
  title: 'EXPEDIÇÃO',
  image: '/ROTEIRO/projeto/imagens/exp.jpg',
  video: '/ROTEIRO/projeto/videos/expedicao6.mp4'
};

// ------------------------------
// Setas (criadas de forma independente para facilitar manipulação)
// ------------------------------

const arrowAlmoxToCartoes: ProcessCard = {
  id: 2,
  isArrow: true,
  arrowDirection: 'right',
  rotation: 0,
  position: '',
  image: '/ROTEIRO/projeto/imagens/SETA.png',
  title: ''
};

const arrowDiagonalDown: ProcessCard = {
  id: 4,
  isArrow: true,
  arrowDirection: 'right',
  rotation: 45,
  position: 'relative',
  image: '/ROTEIRO/projeto/imagens/SETA.png',
  title: ''
};

const arrowTestesToEmbalagem: ProcessCard = {
  id: 7,
  isArrow: true,
  rotation: 180,
  arrowDirection: 'left',
  position: '',
  image: '/ROTEIRO/projeto/imagens/SETA.png',
  title: ''
};

const arrowEmbalagemToExpedicao: ProcessCard = {
  id: 9,
  isArrow: true,
  arrowDirection: 'right',
  rotation: 65,
  position: 'absolute',
  image: '/ROTEIRO/projeto/imagens/SETA.png',
  title: ''
};

// ------------------------------
// Função para renderizar cada card ou seta
// ------------------------------
const renderCard = (card: ProcessCard, openVideo: (url: string, title: string) => void) => {
  if (card.isArrow) {
    const extraTransform = card.id === arrowEmbalagemToExpedicao.id ? ' scaleX(-1)' : '';

    return (
      <div
        className={`relative w-12 h-12 ${card.position || ''}`}
        style={{ transform: `rotate(${card.rotation || 0}deg)${extraTransform}` }}
      >
        <Image
          src={card.image}
          alt="Seta"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      <div className="relative w-64 h-48">
        <Image src={card.image} alt={card.title} fill className="object-cover" />
      </div>
      <div className="w-full p-2">
        <h5 className="text-white text-center text-base font-medium">{card.title}</h5>
      </div>
    </motion.div>
  );

  if (card.link) {
    return <Link href={card.link}>{content}</Link>;
  }
  if (card.video) {
    return (
      <div onClick={() => openVideo(card.video!, card.title)}>
        {content}
      </div>
    );
  }
  return content;
};

// ------------------------------
// Componente principal
// ------------------------------
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
    <div className="relative min-h-screen pt-8 bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url('/ROTEIRO/projeto/imagens/bg.png')" }}
    >
      {/* Prêmios Link */}
      <Link href="/premios" className="absolute top-16 left-40">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-24 h-4 cursor-pointer"
        >
          <Image
            src="/ROTEIRO/projeto/imagens/premios.png"
            alt="Prêmios"
            width={1920}
            height={1080}
            className="object-contain"
          />
        </motion.div>
      </Link>

      {/* Linha Superior: Almoxarifado -> seta -> Montagem de Cartões */}
      <div className="flex items-center justify-center gap-6 mb-8">
        {renderCard(cardAlmoxarifado, openVideo)}
        {renderCard(arrowAlmoxToCartoes, openVideo)}
        {renderCard(cardCartoes, openVideo)}
      </div>

      {/* Linha do Meio: Expedição | Imagem Central | Montagem de Produtos (com setas diagonais) */}
      <div className="flex items-center justify-center gap-8 mb-8 w-full">
        {/* Expedição */}
        <div className="flex flex-col items-center">
          {renderCard(cardExpedicao, openVideo)}
        </div>

        {/* Imagem Central */}
        <motion.div
          className="relative cursor-pointer inline-block"
          onClick={() => openVideo('/ROTEIRO/projeto/videos/Mizu1.mp4', 'Processo')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Image
            src="/ROTEIRO/projeto/imagens/trem.PNG"
            alt="Processo Central"
            width={500}
            height={500}
            className="rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Montagem de Produtos + 2 setas diagonais (Cartões->Produtos e Produtos->Testes) */}
        <div className="flex flex-col items-center relative">
          {renderCard(cardProdutos, openVideo)}
          {/* Seta diagonal para baixo (Cartões para Produtos) */}
          <div className="absolute -top-32 -right-">
            {renderCard(arrowDiagonalDown, openVideo)}
          </div>
          {/* Seta diagonal para baixo (Produtos para Embalagem) */}
          <div className="absolute -bottom-32 -right-120">
            {renderCard({...arrowDiagonalDown, rotation: 140}, openVideo)}
          </div>
        </div>
      </div>

      {/* Linha Inferior: Embalagem -> seta -> Testes */}
      <div className="flex items-center justify-center gap-6 mb-8 relative">
        {renderCard(cardEmbalagem, openVideo)}
        {renderCard(arrowTestesToEmbalagem, openVideo)}
        {renderCard(cardTestes, openVideo)}

        {/* Seta de Embalagem para Expedição */}
        <div
          className="w-12 h-12"
          style={{
            top: '42px',
            left: '-110px',
            position: 'absolute'
          }}
        >
          {renderCard(arrowEmbalagemToExpedicao, openVideo)}
        </div>
      </div>

      {/* Modal de Vídeo */}
      {isVideoOpen && (
        <VideoContainer
          isOpen={isVideoOpen}
          videoUrl={videoInfo.url}
          title={videoInfo.title}
          onClose={closeVideo}
        />
      )}
    </div>
  );
}