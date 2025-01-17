// app/cartoeshub/page.tsx
"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function CartoesHubPage() {
  // Estado para controlar se o componente já foi montado no cliente
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Evita erros de referência ao `window` no SSR
    if (typeof window !== "undefined") {
      const ua = window.navigator?.userAgent || "";

      const isIE6 = ua.includes("MSIE 6");
      const isIE7 = ua.includes("MSIE 7");
      const isIE8 = ua.includes("MSIE 8");
      const isIE = isIE6 || isIE7 || isIE8;

      // Se IE < 9, carrega scripts específicos de compatibilidade
      if (isIE) {
        const head = document.getElementsByTagName("head")[0];

        const respondScript = document.createElement("script");
        respondScript.src =
          "/sites/PTI/easy/templates/easy/assets/js/respond.min.js";
        head.appendChild(respondScript);

        const selectivizrScript = document.createElement("script");
        selectivizrScript.src =
          "/sites/PTI/easy/templates/easy/assets/js/selectivizr.min.js";
        head.appendChild(selectivizrScript);
      }
    }
  }, []);

  // Enquanto não estiver montado, retorna um placeholder (ou null)
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/*
        1) Carrega jQuery com `beforeInteractive` para garantir que 
           jQuery fique disponível antes dos plugins que dependem dele.
      */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("jQuery carregado:", window.jQuery)}
      />

      {/*
        2) Carrega os scripts que precisam do jQuery, ainda "beforeInteractive",
           pois alguns podem registrar plugins no $.fn. 
      */}
      <Script
        src="/ROTEIRO/projeto/assets/js/modernizr.dev.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/konami.js"
        strategy="beforeInteractive"
      />

      {/*
        3) Estilos Inline.
      */}
      <style jsx>{`
        .groundd {
          background-image: url("/ROTEIRO/projeto/imagens/bg.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          height: 94vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 0px;
        }

        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          padding: 20px;
          box-sizing: border-box;
        }

        .container1 {
          flex: 1;
          max-width: 500px;
          text-align: center;
        }

        .image-container {
          cursor: pointer;
          text-align: center;
        }

        .image {
          display: block;
          margin: 0 auto;
          width: 100%;
          height: auto;
          border-radius: 8px;
          border: none;
          outline: none;
          max-height: 80vh;
          object-fit: contain;
        }

        h4 {
          margin-top: 10px;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .wrapper {
            flex-direction: column;
          }
          .container1 {
            max-width: 100%;
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/*
        4) Conteúdo principal.
      */}
      <div className="groundd">
        <div className="wrapper">
          <div className="container1">
            <Link href="/smd">
              <div className="image-container">
                <img
                  className="image"
                  src="/ROTEIRO/projeto/imagens/smdhome.PNG"
                  alt="Imagem SMD"
                />
              </div>
            </Link>
          </div>

          <div className="container1">
            <Link href="/pth">
              <div className="image-container">
                <img
                  className="image"
                  src="/ROTEIRO/projeto/imagens/pthhome.PNG"
                  alt="Imagem PTH"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/*
        5) Scripts que podem ser carregados após a interação, pois 
           não são cruciais para o "primeiro" render.
      */}
      <Script
        src="/ROTEIRO/projeto/assets/js/bootstrap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/tablesaw.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/xtt-dropdown.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/jquery.equalheights.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/bootstrap-datepicker.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/locales/bootstrap-datepicker.pt-BR.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/owl.carousel.min.js"
        strategy="afterInteractive"
      />

      {/* DataTables e plugins */}
      <Script
        src="/ROTEIRO/projeto/assets/js/jquery.dataTables.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/dataTables.fixedHeader.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/dataTables.fixedColumns.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/dataTables.colReorder.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/dataTables.responsive.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/locales/datatable/pt-BR.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/weg.dataTables.js"
        strategy="afterInteractive"
      />
      <Script
        src="/ROTEIRO/projeto/assets/js/select-customer.js"
        strategy="afterInteractive"
      />

      {/*
        6) Script de inicialização - aqui você pode adicionar 
           todo o seu código que depende de jQuery ou desses plugins.
      */}
      <Script id="init-scripts" strategy="afterInteractive">
        {`
          (function() {
            // Garante que jQuery está disponível
            if (typeof jQuery === 'undefined') {
              console.warn('jQuery não foi carregado corretamente.');
              return;
            }

            // Document ready simplificado
            jQuery(function($) {
              
              // Inicializa DatePicker se existir
              if (typeof $.fn.datepicker !== 'undefined') {
                $('.xtt-datepicker').datepicker({
                  language: $('html').attr('lang') || 'en',
                  orientation: "top left"
                }).after('<span class="ion-calendar form-control-feedback"></span>');
              }

              // Inicializa Konami se existir
              if (typeof $.fn.konami !== 'undefined') {
                $(window).konami({
                  cheat: function() {
                    $('html').toggleClass('konami');
                  }
                });
              }

              // Exemplo de botão toggle
              $('.btn-toggle').click(function() {
                $(this).find('.btn').toggleClass('active');
                if ($(this).find('.btn-primary').length > 0) {
                  $(this).find('.btn').toggleClass('btn-primary');
                }
                if ($(this).find('.btn-danger').length > 0) {
                  $(this).find('.btn').toggleClass('btn-danger');
                }
                if ($(this).find('.btn-success').length > 0) {
                  $(this).find('.btn').toggleClass('btn-success');
                }
                if ($(this).find('.btn-info').length > 0) {
                  $(this).find('.btn').toggleClass('btn-info');
                }
                $(this).find('.btn').toggleClass('btn-default');
              });

              // Exemplo de DataTable
              if (typeof $.fn.DataTable !== 'undefined') {
                var $contactTable = $("#noticeBoard-search-contact table").DataTable({
                  paging: false,
                  info: false,
                  ordering: false,
                  scrollY: "200px"
                });

                $("#noticeBoard-search-input").on('keyup', function () {
                  $contactTable.search(this.value).draw();
                });
              }

              // Outras funcionalidades
              $('[data-toggle="xtt-offcanvas"]').click(function () {
                $('.xtt-row-offcanvas').toggleClass('active');
              });

              $(".xtt-toggle-observation").on('click', function(ev){
                ev.preventDefault();
                $(this).hide().next('textarea').removeClass('hidden');
              });

              $('.xtt-check-cart-item').on('change', function(ev){
                if ($(this).is(':checked')) {
                  $(this).closest('tr').addClass('active').next('tr').addClass('active');
                } else {
                  $(this).closest('tr').removeClass('active').next('tr').removeClass('active');
                }
              });

              // Tooltips (exemplo de hover)
              $('.xtt-trigger-tooltip').hover(
                function(ev){
                  var $trigger = $(this);
                  var $tooltip = $trigger.find('.xtt-tooltip');
                  if($tooltip.hasClass("xtt-tooltip-fixed")){
                    var top = $trigger.offset().top + $trigger.innerHeight() + 6;
                    var left = $trigger.offset().left;
                    $tooltip.css({ top: top, left: left });
                  }
                  $tooltip.show();
                }, 
                function(ev){
                  $(this).find('.xtt-tooltip').hide();
                }
              );

              // Ajuste de altura para impressão (exemplo)
              function bodyHeight() {
                var bodyHeight = $(".xtt-row-offcanvas").outerHeight();
                // Aqui poderia inserir alguma CSS dinâmica no <head> pra media print
                // Exemplo: $('head').append(\`<style>@media print { body { height: \${bodyHeight}px; } }</style>\`);
              }
              bodyHeight();

              $(window).resize(function() {
                bodyHeight();
              });
            });
          })();
        `}
      </Script>
    </>
  );
}
