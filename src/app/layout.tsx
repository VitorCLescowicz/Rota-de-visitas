// app/layout.tsx
"use client";

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/app/client-layout';
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TranslateScript from '@/components/TranslateScript';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const getPageTitle = (pathname: string) => {
  const titles: { [key: string]: string } = {
    '/': 'Início',
    '/processos': 'Processos',
    '/smd': 'SMD',
    '/pth': 'PTH',
    '/produtos': 'Produtos',
    '/testes': 'Testes',
    '/premios': 'Prêmios',
  };

  return titles[pathname] || 'Página';
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false);
  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsLocked(true);
        console.log("Screen locked due to inactivity");
      }, 350 * 1000);
    };

    resetInactivityTimer();

    const activityEvents = ["mousemove", "keydown", "click"];
    
    const handleUserActivity = () => {
      if (!isLocked) {
        resetInactivityTimer();
      }
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isLocked]);

  const handleUnlock = () => {
    setIsLocked(false);
    router.push("/");
    console.log("Screen unlocked - returning to home page");
  };

  return (
    <html lang="pt-BR">
      <head>
        <title>{`${pageTitle} | Roteiro de Visitas`}</title>
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} pt-16`}>
        <TranslateScript />
        {isLocked ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
            onClick={handleUnlock}
          >
            <video
              src="/ROTEIRO/projeto/videos/products-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onLoadedData={() => console.log("Lock screen video loaded")}
              onError={(e) => console.error("Error loading lock screen video:", e)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-xl">Clique na tela para desbloquear</p>
            </div>
          </motion.div>
        ) : (
          <ClientLayout>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </ClientLayout>
        )}
      </body>
    </html>
  );
}