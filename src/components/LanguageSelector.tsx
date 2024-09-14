import { useEffect, useState } from "react"
import { getLanguages } from "../api/language-api";
import { Language } from "../classes/languages";

const LanguageSelector = ({language, setLanguage}) => {

  const [languages, setLanguages] = useState<Language[] | null>();

  useEffect(() => {
    const getLangs = async () => {
      setLanguages(await getLanguages());
    }
    getLangs();
  }, []);

  useEffect(() => {
    if(!languages || languages.length === 0) return;

    const currentLanguage = languages.find(language => language.iso === navigator.language)
    if(currentLanguage){
      setLanguage(currentLanguage.iso);
    }else{
      setLanguage(languages[0].iso);
    };
  }, [languages]);

  return(
    <div>
      {languages && languages.length > 0 && languages.map((language) => (
        <button key={language.id} onClick={() => setLanguage(language.iso)}>{language.iso}</button>
      ))}
    </div>
  )
}

export default LanguageSelector