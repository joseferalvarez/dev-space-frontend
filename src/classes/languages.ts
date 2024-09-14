export class Language{
  id: number;
  iso: string;
  translations: LanguageTranslation[] | null;

  constructor(id: number, iso: string, translations: LanguageTranslation[] | null){
    this.id = id;
    this.iso = iso;
    this.translations = translations
  }  
}

export class LanguageTranslation{
  id: number;
  languageId: number;
  languageIso: string;
  languageName: string;

  constructor(id: number, languageId: number, languageIso: string, languageName: string){
    this.id = id;
    this.languageId = languageId;
    this.languageIso = languageIso;
    this.languageName = languageName;
  }
}