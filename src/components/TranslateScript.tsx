// components/TranslateScript.tsx
"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

export default function TranslateScript() {
  useEffect(() => {
    // Inicializa o Google Translate
    window.googleTranslateElementInit = () => {
      new google.translate.TranslateElement(
        {
          pageLanguage: "pt",
          includedLanguages: "en,pt,es,fr,de,it,ja,ko,zh,ru,ar,hi,tr,nl,pl,vi",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // CSS para ocultar elementos do Google Translate
    const style = document.createElement('style');
    style.textContent = `
      .skiptranslate iframe,
      .goog-te-banner-frame,
      .goog-te-banner-frame.skiptranslate,
      #goog-gt-tt, 
      .goog-te-balloon-frame,
      div#goog-gt-{
        display: none !important;
      }
      
      .goog-te-gadget {
        padding: 0 !important;
        margin: 0 !important;
      }

      body {
        top: 0 !important;
        position: static !important;
      }
      
      .VIpgJd-ZVi9od-l4eHX-hSRGPd,
      .goog-te-gadget-icon,
      .goog-te-gadget-simple img,
      .goog-te-banner-frame,
      .goog-te-menu-value span,
      .goog-te-menu-frame,
      .goog-te-menu2,
      .goog-te-spinner-pos,
      .goog-tooltip,
      .goog-te-balloon-frame {
        display: none !important;
      }

      #google_translate_element select {
        display: none !important;
      }
      
      .goog-te-gadget-simple {
        background-color: transparent !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    `;
    document.head.appendChild(style);

    // Remove elementos periodicamente
    const removeUnwantedElements = () => {
      const elements = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate');
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
      document.body.style.top = '0px';
    };

    const interval = setInterval(removeUnwantedElements, 100);
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}