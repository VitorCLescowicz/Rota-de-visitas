// utils/i18n.ts
import pt from '../locales/pt.json';
import en from '../locales/en.json';

type Translations = {
  [key: string]: string;
};

type LocaleResources = {
  [lang: string]: Translations;
};

// Mapeamento dos idiomas e suas traduções
const translations: LocaleResources = {
  pt,
  en,
  // Adicione outros idiomas aqui conforme necessário
};

/**
 * Função para retornar uma tradução baseada na chave e no idioma atual.
 * @param key - A chave do texto a ser traduzido.
 * @param lang - O idioma atual (ex.: 'pt', 'en').
 * @returns A tradução correspondente ou a própria chave caso não exista tradução.
 */
export function t(key: string, lang: string = 'pt'): string {
  return translations[lang]?.[key] || key;
}
