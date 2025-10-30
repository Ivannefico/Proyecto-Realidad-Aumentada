// src/idiomas/Idioma.jsx
import React, { createContext, useState, useEffect } from "react";
import texts from "../language/traducciones";

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
    <LanguageContext.Provider value={{ idioma, cambiarIdioma, texts: texts[idioma] }}>
      {children}
    </LanguageContext.Provider>
  );
};
