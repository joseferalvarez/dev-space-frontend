interface ITranslation{
  id: number,
  language_id: number,
  language_iso: string,
  language_name: string
}
interface ILanguage{
  id: number,
  iso: string,
  translations: ITranslation[]
}
export type {ITranslation, ILanguage}