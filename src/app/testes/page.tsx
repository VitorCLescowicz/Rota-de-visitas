'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoContainer from '@/components/VideoContainer';
import styles from './page.module.css';

interface VideoInfo {
  url: string;
  title: string;
}

export default function TestsPage() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = (url: string, title: string) => {
    setVideoInfo({ url, title });
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setVideoInfo(null);
    setIsVideoOpen(false);
  };

  return (
    <div className={styles.background}>
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8">
        {/* Card Teste Funcional */}
        <div className="w-full md:w-1/2 text-center">
          <p className="text-4xl font-semibold mb-2 text-white">Teste Funcional</p>
          <div 
            className="cursor-pointer"
            onClick={() => openVideo('/ROTEIRO/projeto/videos/LIM.mp4', 'Teste Funcional')}
          >
            <Image
              src="/ROTEIRO/projeto/imagens/TF.PNG"
              alt="Test Image 1"
              width={400}
              height={300}
              className="w-4/5 mx-auto rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Card Teste de Carga */}
        <div className="w-full md:w-1/2 text-center">
          <p className="text-4xl font-semibold mb-2 text-white">Teste de Carga</p>
          <div 
            className="cursor-pointer"
            onClick={() => openVideo('/ROTEIRO/projeto/videos/TC2.mp4', 'Teste de Carga')}
          >
            <Image
              src="/ROTEIRO/projeto/imagens/TC.PNG"
              alt="Test Image 2"
              width={400}
              height={300}
              className="w-4/5 mx-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      <VideoContainer 
        isOpen={isVideoOpen}
        videoUrl={videoInfo?.url || ''}
        title={videoInfo?.title}
        onClose={closeVideo}
      />
    </div>
  );
}