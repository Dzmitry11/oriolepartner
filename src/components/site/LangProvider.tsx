import { createContext, useContext, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "@/content/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <LangCtx.Provider value={{ lang, setLang, t: dict[lang] as Dict }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
