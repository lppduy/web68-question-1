// LanguageContext.js
import React, { createContext, useContext, useState } from "react";
import language from "./language";

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState("en"); // Ngôn ngữ mặc định

  const value = {
    language: language[currentLanguage],
    setLanguage: setCurrentLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
