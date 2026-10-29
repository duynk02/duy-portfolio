import { createContext, useContext } from 'react'
import type { Language, Localized } from '../content/portfolio'
import { translations } from './translations'

type Translation = { [K in keyof typeof translations.vi]: string }
export const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  text: (value: Localized) => string
  t: Translation
} | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage requires LanguageProvider')
  return context
}
