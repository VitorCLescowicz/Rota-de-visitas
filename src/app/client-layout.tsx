'use client';

import Navbar from "@/components/Navbar";
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <main id="pageContainer" className="w-full" style={{ minHeight: "calc(100vh - 4rem)" }}>
        <AnimatePresence mode="wait">
          <div key={pathname}>
            {children}
          </div>
        </AnimatePresence>
      </main>
    </>
  );
}

