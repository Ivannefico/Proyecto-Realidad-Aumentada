// components/Themes.jsx
import { useTheme } from "../hooks/useThemes"; // 👈 importás tu hook
import { useEffect } from "react";

export default function Themes() {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    // Aplica la clase "dark" al body según el estado
    document.body.classList.toggle("dark", isDark);
    // Guarda la preferencia para futuras visitas
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      className="theme-button"
      onClick={toggleTheme}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
