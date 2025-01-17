"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home,
  Settings,
  Package,
  Award,
  CircuitBoard,
  Cpu,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  Globe,
  Check
} from "lucide-react";

const pages = ["/", "/processos", "/smd", "/pth", "/produtos", "/testes", "/premios"];

const pageIcons: { [key: string]: React.ReactNode } = {
  "/": <Home className="w-5 h-5" />,
  "/processos": <Settings className="w-5 h-5" />,
  "/smd": <CircuitBoard className="w-5 h-5" />,
  "/pth": <Cpu className="w-5 h-5" />,
  "/produtos": <Package className="w-5 h-5" />,
  "/testes": <ClipboardCheck className="w-5 h-5" />,
  "/premios": <Award className="w-5 h-5" />
};

const languages = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
  { code: 'vi', name: 'Tiếng Việt' }
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('pt');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
    setCanGoForward(window.history.length > 1 && window.history.state !== null);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lang-menu') && langMenuOpen) {
        setLangMenuOpen(false);
      }
    };

    const detectLanguage = () => {
      const match = document.cookie.match(/googtrans=([^;]+)/);
      if (match) {
        const value = decodeURIComponent(match[1]);
        const lang = value.split('/').pop();
        if (lang) setCurrentLang(lang);
      }
    };

    const handlePopState = () => {
      setCanGoBack(window.history.length > 1);
      setCanGoForward(window.history.length > 1 && window.history.state !== null);
    };

    detectLanguage();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [langMenuOpen]);

  const changeLanguage = (lang: string) => {
    document.cookie = `googtrans=/pt/${lang}; path=/;`;
    setCurrentLang(lang);
    window.location.reload();
  };

  const handleForward = () => {
    window.history.forward();
  };

  const handleBack = () => {
    window.history.back();
  };

  const getPageName = (page: string) => {
    const pageNames: { [key: string]: string } = {
      "/": "Início",
      "/processos": "Processos",
      "/smd": "SMD",
      "/pth": "PTH",
      "/produtos": "Produtos",
      "/testes": "Testes",
      "/premios": "Prêmios"
    };
    return pageNames[page] || "";
  };

  const menuButtonVariants = {
    open: {
      rotate: 90,
      scale: 1,
      transition: { duration: 0.4, ease: "anticipate" }
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "anticipate" }
    }
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg border-b border-gray-200' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left section with Logo and Menu */}
          <div className="flex items-center space-x-4">
            <motion.img
              src="/weg.svg"
              alt="Logo WEG"
              className="h-12 cursor-pointer"
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.button
              className="relative w-14 h-14 rounded-full bg-[#045ca4] hover:bg-[#034f8a] transition-colors flex items-center justify-center overflow-hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={menuOpen ? "open" : "closed"}
              variants={menuButtonVariants}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Center section with title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <motion.span 
              className="text-xl font-medium text-[#045ca4]"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              key={pathname}
            >
              {getPageName(pathname)}
            </motion.span>
          </div>

          {/* Right section with Navigation and Language Controls */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleBack}
              disabled={!canGoBack}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors
                ${canGoBack 
                  ? 'bg-[#045ca4] hover:bg-[#034f8a] text-white' 
                  : 'bg-gray-200 cursor-not-allowed text-gray-400'}`}
              whileHover={canGoBack ? { scale: 1.05 } : {}}
              whileTap={canGoBack ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={handleForward}
              disabled={!canGoForward}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors
                ${canGoForward 
                  ? 'bg-[#045ca4] hover:bg-[#034f8a] text-white' 
                  : 'bg-gray-200 cursor-not-allowed text-gray-400'}`}
              whileHover={canGoForward ? { scale: 1.05 } : {}}
              whileTap={canGoForward ? { scale: 0.95 } : {}}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Language Menu */}
            <div className="relative ml-2 lang-menu">
              <motion.button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#045ca4] hover:bg-[#034f8a] text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="py-1 max-h-96 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <span>{lang.name}</span>
                          {currentLang === lang.code && (
                            <Check className="w-4 h-4 text-[#045ca4]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Dropdown - Vertical Layout */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed left-0 right-0 bg-white shadow-xl overflow-hidden z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
                <ul className="space-y-2">
                  {pages.map((page, index) => (
                    <motion.li
                      key={page}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={page}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-colors ${
                          pathname === page
                            ? 'bg-[#045ca4] text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="flex-shrink-0">{pageIcons[page]}</span>
                        <span className="font-medium text-lg">{getPageName(page)}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}