import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [idioma, setIdioma] = useState("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");
    if (guardado) setIdioma(guardado);
  }, []);

  const cambiarIdioma = (nuevo) => {
    setIdioma(nuevo);
    localStorage.setItem("idioma", nuevo);
  };

  return (
    <LanguageContext.Provider value={{ idioma, cambiarIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
};