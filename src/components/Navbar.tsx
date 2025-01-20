"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Settings,
  Cuboid,
  Award,
  CircuitBoard,
  Cpu,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  Globe,
  Check,
} from "lucide-react";

/**
 * Estrutura do menu, incluindo a rota de Processos e seus subitens.
 */
const menuItems = [
  {
    path: "/",
    label: "Início",
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: "/premios",
    label: "Prêmios",
    icon: <Award className="w-5 h-5" />,
  },
  {
    path: "/processos",
    label: "Processos",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    path: "/smd",
    label: "SMD",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    path: "/pth",
    label: "PTH",
    icon: <CircuitBoard className="w-5 h-5" />,
  },
  {
    path: "/produtos",
    label: "Produtos",
    icon: <Cuboid className="w-5 h-5" />,
  },
  {
    path: "/testes",
    label: "Testes",
    icon: <ClipboardCheck className="w-5 h-5" />,
  },
];

// ...existing code...

/**
 * Dicionário para exibir o título da página no Navbar.
 */
const pageNames: { [key: string]: string } = {
  "/": "Início",
  "/premios": "Prêmios",
  "/processos": "Processos",
  "/smd": "SMD",
  "/pth": "PTH",
  "/produtos": "Produtos",
  "/testes": "Testes",
};

const languages = [
  { code: "pt", name: "Português" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "中文" },
  { code: "ru", name: "Русский" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "tr", name: "Türkçe" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "vi", name: "Tiếng Việt" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Controle do menu lateral/dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  // Controle do background com sombra ao descer a página
  const [scrolled, setScrolled] = useState(false);
  // Controle de menu de idiomas
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  // Idioma atual (para exibir seleção)
  const [currentLang, setCurrentLang] = useState("pt");

  // Detecta scroll e clique fora do menu de idiomas
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".lang-menu") && langMenuOpen) {
        setLangMenuOpen(false);
      }
    };

    const detectLanguage = () => {
      const match = document.cookie.match(/googtrans=([^;]+)/);
      if (match) {
        const value = decodeURIComponent(match[1]);
        const lang = value.split("/").pop();
        if (lang) setCurrentLang(lang);
      }
    };

    detectLanguage();
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [langMenuOpen]);

  // Troca de idioma (exemplo usando Google Translate)
  const changeLanguage = (lang: string) => {
    document.cookie = `googtrans=/pt/${lang}; path=/;`;
    setCurrentLang(lang);
    window.location.reload();
  };

  // Botão de voltar sem bloqueios
  const handleBack = () => {
    window.history.back();
  };

  // Botão de avançar sem bloqueios
  const handleForward = () => {
    window.history.forward();
  };

  // Retorna o nome da rota para exibir no Navbar
  const getPageName = (page: string) => {
    return pageNames[page] || "";
  };

  // Animação do botão de menu (framer-motion)
  const menuButtonVariants = {
    open: {
      rotate: 90,
      scale: 1,
      transition: { duration: 0.4, ease: "anticipate" },
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "anticipate" },
    },
  };

  /**
   * Renderiza itens do menu recursivamente para lidar com submenus.
   */
  const renderMenuItems = (items: any[], depth = 0) => {
    return items.map((item, index) => {
      const hasChildren = item.children && item.children.length > 0;

      return (
        <motion.li
          key={item.path || item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`pl-${depth * 4}`} // Ajuste de indentação
        >
          {item.path ? (
            // Se o item tiver uma rota, usa Link
            <Link
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-colors ${
                pathname === item.path
                  ? "bg-[#045ca4] text-white"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium text-lg">{item.label}</span>
            </Link>
          ) : (
            // Caso não tenha path, exibe como título/cabeçalho
            <div className="flex items-center space-x-4 p-4 rounded-xl text-gray-700 font-medium text-lg">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          )}

          {hasChildren && (
            <ul className="ml-4">{renderMenuItems(item.children, depth + 1)}</ul>
          )}
        </motion.li>
      );
    });
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg border-b border-gray-200"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Seção Esquerda: Logo e Botão de Menu */}
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

          {/* Seção Central: Título da Página */}
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

          {/* Seção Direita: Navegação (Voltar/Avançar) e Idiomas */}
          <div className="flex items-center space-x-3">
            {/* Botão de Voltar */}
            <motion.button
              onClick={handleBack}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#045ca4] hover:bg-[#034f8a] text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Botão de Avançar */}
            <motion.button
              onClick={handleForward}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#045ca4] hover:bg-[#034f8a] text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Menu de Idioma */}
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

      {/* Menu Dropdown (quando o usuário clica no ícone de menu) */}
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
                  {renderMenuItems(menuItems)}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
