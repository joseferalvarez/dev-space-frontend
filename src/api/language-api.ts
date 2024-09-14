import { Language, LanguageTranslation } from "../classes/languages";
import { ITranslation, ILanguage } from "../interfaces/languageIntefaces";

const getLanguages = async (): Promise<Language[] | null> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/languages/`, {
    method: 'GET'
  });
  const data = await res.json();

  if(!data) return null;

  return data.map((language: ILanguage) => {

    const translates = Object.keys(language.translations).length > 0 ? language.translations.map((translation: ITranslation) => {
      return new LanguageTranslation(
        translation.id,
        translation.language_id,
        translation.language_iso,
        translation.language_name
      );
    }) : null;

    return new Language(
      language.id,
      language.iso,
      translates,
    );
  });
}

const postLanguage = async (iso: string, languageName: string, translationIso: string, translationName: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/language/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      iso: iso,
      language_name: languageName
    })
  });
  const data = await res.json();

  const language = new Language(
    data.id,
    data.iso,
    data.translations
  )

  const resTranslate = await fetch(`${import.meta.env.VITE_API_URL}/language-translation/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      language_id: data.id,
      language_iso: translationIso,
      language_name: translationName
    })
  })

  const dataTranslate = await resTranslate.json();

  const translation = new LanguageTranslation(
    dataTranslate.id,
    dataTranslate.language_id,
    dataTranslate.language_iso,
    dataTranslate.language_name
  );

  language.translations = [translation];

  return language;
};

export {getLanguages, postLanguage}