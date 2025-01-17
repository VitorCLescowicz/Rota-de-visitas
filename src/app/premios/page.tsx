"use client";

import Head from "next/head";

export default function PremiosPage() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>WEG - Prêmios</title>
        <meta
          name="description"
          content="Guia de estilos do Projeto Easy WEG E-commerce"
        />
        <link rel="stylesheet" href="/ROTEIRO/projeto/assets/css/weg.ext.css" />
        <link rel="stylesheet" href="/ROTEIRO/projeto/assets/css/weg.google.fonts.css" />
        <link rel="stylesheet" href="/ROTEIRO/projeto/assets/css/bootstrap/weg.bootstrap.css" />
        <link rel="stylesheet" href="/ROTEIRO/projeto/assets/css/weg.css" />
        <link rel="stylesheet" href="/ROTEIRO/projeto/src/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Head>

      <main>
        <h2 style={{ textAlign: "center", marginTop: "20px", fontSize: "32px" }}>
          PRÊMIOS DEPARTAMENTO PRODUÇÃO DRIVES
        </h2>

        <div className="wrapper">
          <div className="container1">
            <div className="image-container">
              <img
                className="image"
                src="/ROTEIRO/projeto/imagens/12015.png"
                alt="2015"
              />
              <h4>2015</h4>
              <br />
              <h4>1° Colocado na Categoria Excelência em Produtividade</h4>
            </div>
          </div>

          <div className="container1">
            <div className="image-container">
              <img
                className="image"
                src="/ROTEIRO/projeto/imagens/12016.png"
                alt="2016"
              />
              <h4>2016</h4>
              <br />
              <h4>
                1° Colocado na Categoria Excelência no Sistema de Melhoria Contínua
              </h4>
            </div>
          </div>

          <div className="container1">
            <div className="image-container">
              <img
                className="image"
                src="/ROTEIRO/projeto/imagens/12021.png"
                alt="2021"
              />
              <h4>2021</h4>
              <br />
              <h4>1° Colocado na Categoria Excelência em Produtividade</h4>
            </div>
          </div>

          <div className="container1">
            <div className="image-container" style={{ marginBottom: "10px" }}>
              <img
                className="image"
                src="/ROTEIRO/projeto/imagens/12022.png"
                alt="2022"
              />
              <h4>2022</h4>
              <br />
              <h4>2° Colocado no Prêmio Kaizen Global</h4>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .wrapper {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .container1 {
          flex: 0 0 calc(25% - 20px);
          margin: 10px;
          text-align: center;
        }
        .image-container {
          cursor: pointer;
          text-align: center;
        }
        .image {
          width: 100%;
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        h4 {
          margin-top: 10px;
          font-size: 18px;
        }
        @media (max-width: 992px) {
          .container1 {
            flex: 0 0 calc(33.33% - 20px);
          }
        }
        @media (max-width: 768px) {
          .container1 {
            flex: 0 0 calc(50% - 20px);
          }
        }
        @media (max-width: 576px) {
          .container1 {
            flex: 0 0 calc(100% - 20px);
          }
        }
      `}</style>
    </>
  );
}
