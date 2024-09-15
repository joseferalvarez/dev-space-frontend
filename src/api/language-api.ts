import { Language, LanguageTranslation } from "../classes/languages";
import { ITranslation, ILanguage } from "../interfaces/languageIntefaces";

const getLanguages = async (): Promise<Language[] | null> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/languages/`, {
    method: 'GET'
  });
  const data = await res.json();

  if(!data) return null;

  return data.map((language: ILanguage) => {

    const translates = Object.keys(language.translations).length > 0 ? Object.values(language.translations).map((translation: ITranslation) => {
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

const postLanguage = async (iso: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/language/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      iso: iso,
    })
  });
  const data = await res.json();

  return data;
};

const putLanguage = async (id: number, iso: string, languageName: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/language/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      iso: iso,
      language_name: languageName
    })
  })
  const data = await res.json()

  return data
}

const deleteLanguage = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/language/${id}/`, {
    method: 'DELETE'
  })
  const data = await res.json()

  return data
}

export {getLanguages, postLanguage, putLanguage, deleteLanguage}