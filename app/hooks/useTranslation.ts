'use client'

import { useLanguage } from '../context/LanguageContext'
import enTranslations from '../i18n/translations/en.json'
import trTranslations from '../i18n/translations/tr.json'

type TranslationValue = string | string[] | { [key: string]: TranslationValue }

export function useTranslation() {
  const { language } = useLanguage()

  const getString = (value: TranslationValue): string => {
    if (typeof value === 'string') return value
    return String(value)
  }

  const getArray = (value: TranslationValue): string[] => {
    if (Array.isArray(value)) return value
    return []
  }

  const translate = (key: string): TranslationValue => {
    const keys = key.split('.')
    let translation: any = language === 'en' ? enTranslations : trTranslations

    for (const k of keys) {
      if (translation === undefined) {
        return key
      }
      translation = translation[k]
    }

    return translation ?? key
  }

  return { 
    t: translate,
    tString: (key: string) => getString(translate(key)),
    tArray: (key: string) => getArray(translate(key))
  }
}
