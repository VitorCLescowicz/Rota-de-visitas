// app/car
// // app/cartoeshub/page.tsx
"use client";


// toeshub/page.tsx
import Link from "next/link";

export default function CartoesHubPage() {
  return (
    <>
      {/* Estilos Inline */}
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

      {/* Conteúdo principal */}
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
    </>
  );
}
