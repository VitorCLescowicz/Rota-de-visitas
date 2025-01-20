'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';

// Types
interface VideoContainerProps {
  isOpen: boolean;
  videoUrl: string;
  title?: string;
  onClose: () => void;
  poster?: string;
  autoPlay?: boolean;
  startTime?: number;
  onError?: (error: Error) => void;
}

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  currentTime: number;
  duration: number;
  onPlay: () => void;
  onMute: () => void;
  onFullscreen: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Utility Functions
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Components
const VideoControls: FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  isFullscreen,
  currentTime,
  duration,
  onPlay,
  onMute,
  onFullscreen,
  onSeek,
}) => (
  <div className="flex flex-col gap-2">
    <input
      type="range"
      min={0}
      max={duration}
      value={currentTime}
      onChange={onSeek}
      className="w-full cursor-pointer"
      style={{
        background: `linear-gradient(to right, #fff ${
          (currentTime / duration) * 100
        }%, #4b5563 ${(currentTime / duration) * 100}%)`
      }}
    />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onPlay}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={onMute}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <span className="text-white text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <button
        onClick={onFullscreen}
        className="text-white hover:text-gray-300 transition-colors"
        aria-label={isFullscreen ? 'Sair do modo fullscreen' : 'Entrar no modo fullscreen'}
      >
        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
  </div>
);

const ErrorDisplay: FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="text-white text-center p-4">
    <p className="text-red-500 mb-2">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
    >
      Tentar Novamente
    </button>
  </div>
);

// Main Component
const VideoContainer: FC<VideoContainerProps> = ({
  isOpen,
  videoUrl,
  title,
  onClose,
  poster,
  autoPlay = true,
  startTime = 0,
  onError
}) => {
  // States
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    isMuted: false,
    isFullscreen: false,
    currentTime: 0,
    duration: 0,
    isLoading: true,
    error: null as string | null,
    showControls: false
  });

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effects
  useEffect(() => {
    if (videoRef.current && startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
        .then(() => setVideoState(prev => ({ ...prev, isPlaying: true })))
        .catch(error => {
          console.error('Auto-play falhou:', error);
          setVideoState(prev => ({ ...prev, isPlaying: false }));
        });
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleError = () => {
        const errorMessage = 'Erro ao carregar o vídeo. Por favor, tente novamente.';
        setVideoState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        onError?.(new Error(errorMessage));
      };

      video.addEventListener('error', handleError);
      return () => video.removeEventListener('error', handleError);
    }
  }, [onError]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handlers
  const handleMouseMove = () => {
    setVideoState(prev => ({ ...prev, showControls: true }));
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setVideoState(prev => ({ ...prev, showControls: false }));
    }, 2000);
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoState.isMuted;
      setVideoState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  const handleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await videoRef.current?.parentElement?.requestFullscreen();
        setVideoState(prev => ({ ...prev, isFullscreen: true }));
      } catch (err) {
        console.error('Erro ao ativar o modo fullscreen:', err);
      }
    } else {
      await document.exitFullscreen();
      setVideoState(prev => ({ ...prev, isFullscreen: false }));
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col items-center bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
          >
            {title && (
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-white text-xl font-semibold p-4 w-full bg-black/50 absolute top-0 z-10 text-center"
              >
                {title}
              </motion.h2>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-20"
              aria-label="Fechar vídeo"
            >
              <X size={24} />
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setVideoState(prev => ({ ...prev, showControls: false }))}
              onClick={() => setVideoState(prev => ({ ...prev, showControls: !prev.showControls }))}
            >
              {videoState.isLoading && <LoadingSpinner />}

              {videoState.error ? (
                <ErrorDisplay 
                  error={videoState.error} 
                  onRetry={() => {
                    setVideoState(prev => ({ ...prev, error: null, isLoading: true }));
                    videoRef.current?.load();
                  }}
                />
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster={poster}
                  playsInline
                  autoPlay={autoPlay}
                  loop
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setVideoState(prev => ({ ...prev, currentTime: videoRef.current!.currentTime }));
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setVideoState(prev => ({
                        ...prev,
                        duration: videoRef.current!.duration,
                        isLoading: false
                      }));
                    }
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              )}

              <motion.div
                initial="hidden"
                animate={videoState.showControls ? 'visible' : 'hidden'}
                variants={overlayVariants}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
              >
                <VideoControls
                  isPlaying={videoState.isPlaying}
                  isMuted={videoState.isMuted}
                  isFullscreen={videoState.isFullscreen}
                  currentTime={videoState.currentTime}
                  duration={videoState.duration}
                  onPlay={handlePlay}
                  onMute={handleMute}
                  onFullscreen={handleFullscreen}
                  onSeek={(e) => {
                    const time = parseFloat(e.target.value);
                    if (videoRef.current) {
                      videoRef.current.currentTime = time;
                      setVideoState(prev => ({ ...prev, currentTime: time }));
                    }
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoContainer;