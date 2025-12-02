import React from "react";

function Home({ onLoad }) {
  return (
    <div
      style={{
        display: "flex",           // usamos flex para centrar
        flexDirection: "column",   // apilar verticalmente
        justifyContent: "center",  // centrar verticalmente
        alignItems: "center",      // centrar horizontalmente
        height: "100vh",           // ocupar toda la pantalla
        fontFamily: "Arial",
        padding: "20px",
        backgroundColor: "#f5f5f5" // opcional, fondo más agradable
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Home</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        <b>Nombre completo:</b> Shakira Priscilla Martínez Reyes
      </p>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        <b>Carné:</b> 15000339
      </p>
      <button
        onClick={onLoad}
        style={{
          background: "#1E88E5",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}
      >
        Cargar
      </button>
    </div>
  );
}

export default Home;
