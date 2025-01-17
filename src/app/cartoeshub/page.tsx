// app/cartoeshub/page.tsx
"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function CartoesHubPage() {
  // Efeito para inicializar scripts após carregamento do componente
  useEffect(() => {
    // Verifica IE apenas no lado do cliente
    if (typeof window !== "undefined") {
      const isIE = navigator.userAgent.indexOf('MSIE 6') !== -1 || 
                   navigator.userAgent.indexOf('MSIE 7') !== -1 || 
                   navigator.userAgent.indexOf('MSIE 8') !== -1;

      if (isIE) {
        const head = document.getElementsByTagName('head')[0];
        
        const respondScript = document.createElement('script');
        respondScript.src = '/sites/PTI/easy/templates/easy/assets/js/respond.min.js';
        head.appendChild(respondScript);

        const selectivizrScript = document.createElement('script');
        selectivizrScript.src = '/sites/PTI/easy/templates/easy/assets/js/selectivizr.min.js';
        head.appendChild(selectivizrScript);
      }
    }
  }, []);

  return (
    <>
      {/* Core dependencies */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js"
        strategy="beforeInteractive"
        id="jquery"
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/modernizr.dev.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/konami.js" 
        strategy="beforeInteractive" 
      />

      {/* Estilos Inline */}
      <style jsx>{`
        .groundd {
          background-image: url('/ROTEIRO/projeto/imagens/bg.png');
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

      {/* Conteúdo Principal */}
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

      {/* Scripts externos com ordem otimizada */}
      <Script 
        src="/ROTEIRO/projeto/assets/js/bootstrap.min.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/tablesaw.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/xtt-dropdown.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/jquery.equalheights.min.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/bootstrap-datepicker.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "bootstrap"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/locales/bootstrap-datepicker.pt-BR.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "bootstrap", "datepicker"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/owl.carousel.min.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />

      {/* DataTables e plugins */}
      <Script 
        src="/ROTEIRO/projeto/assets/js/jquery.dataTables.min.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/dataTables.fixedHeader.min.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "datatables"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/dataTables.fixedColumns.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "datatables"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/dataTables.colReorder.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "datatables"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/dataTables.responsive.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "datatables"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/locales/datatable/pt-BR.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "datatables"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/weg.dataTables.js" 
        strategy="afterInteractive"
        dependOn={["jquery", "datatables"]} 
      />
      <Script 
        src="/ROTEIRO/projeto/assets/js/select-customer.js" 
        strategy="afterInteractive"
        dependOn={["jquery"]} 
      />

      {/* Script de inicialização */}
      <Script id="init-scripts" strategy="afterInteractive">
        {`
          window.addEventListener('load', function() {
            if (typeof jQuery !== 'undefined') {
              $(document).ready(function() {
                // Datepicker initialization
                if (typeof $.fn.datepicker !== 'undefined') {
                  $('.xtt-datepicker').datepicker({
                    language: $('html').attr('lang') || 'en',
                    orientation: "top left"
                  }).after('<span class="ion-calendar form-control-feedback"></span>');
                }

                // Konami code
                if (typeof $.fn.konami !== 'undefined') {
                  $(window).konami({
                    cheat: function() {
                      $('html').toggleClass('konami');
                    }
                  });
                }

                // Toggle buttons
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

                // DataTables initialization
                if (typeof $.fn.DataTable !== 'undefined') {
                  var $contactTable = $("#noticeBoard-search-contact table").DataTable({
                    paging: false,
                    "info": false,
                    "ordering": false,
                    "scrollY": "200px"
                  });

                  $("#noticeBoard-search-input").on('keyup', function () {
                    $contactTable.search(this.value).draw();
                  });
                }

                // Other functionality
                $('[data-toggle="xtt-offcanvas"]').click(function () {
                  $('.xtt-row-offcanvas').toggleClass('active');
                });

                $(".xtt-toggle-observation").on('click', function(ev){
                  ev.preventDefault();
                  $(this).hide().next('textarea').removeClass('hidden');
                });

                $('.xtt-check-cart-item').on('change',function(ev){
                  if($(this).is(':checked')){
                    $(this).closest('tr').addClass('active').next('tr').addClass('active');
                  } else {
                    $(this).closest('tr').removeClass('active').next('tr').removeClass('active');
                  }
                });

                // Tooltips
                $('.xtt-trigger-tooltip').hover(function(ev){
                  var $trigger = $(this);
                  var $tooltip = $trigger.find('.xtt-tooltip');
                  if($tooltip.hasClass("xtt-tooltip-fixed")){
                    var top = $trigger.offset().top + $trigger.innerHeight() + 6;
                    var left = $trigger.offset().left;
                    $tooltip.css("top",top).css("left",left);
                  }
                  $tooltip.show();
                }, function(ev){
                  $(this).find('.xtt-tooltip').hide();
                });

                // Height fix for print
                function bodyHeight() {
                  var bodyHeight = $(".xtt-row-offcanvas").outerHeight();
                  $('head').find('style').text("@media print { body { height: " + bodyHeight + "px; } }");
                }

                bodyHeight();
                $(window).resize(function() {
                  bodyHeight();
                });
              });
            }
          });
        `}
      </Script>
    </>
  );
}