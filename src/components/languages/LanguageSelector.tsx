import { useEffect, useState } from "react"
import { getLanguages } from "../../api/language-api";
import { Language } from "../../classes/languages";
import LanguageIcon from "../icons/LanguageIcon";
import PlusIcon from "../icons/PlusIcon";
import LanguageEditor from "./LanguageEditor";

const LanguageSelector = ({language, setLanguage}) => {

  const [languages, setLanguages] = useState<Language[] | null>();
  const [display, setDisplay] = useState<{languages: boolean, popup: boolean}>({languages: false, popup: false});

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
    <>
      <div className='text-slate-300 uppercase relative'>
        <button className="uppercase flex justify-center items-center gap-[10px]" onClick={() => setDisplay({...display, languages: !display.languages})}>
          <LanguageIcon/>
          {language}
        </button>
        {display.languages &&
          <div className={`absolute top-[100%] left-[50%] translate-x-[-50%] rounded-md border-[1px] border-slate-600 ${display.languages ? 'bg-slate-800' : ''}`}>
            {languages && languages.length > 0 && languages.map((language) => (
              <button className="uppercase transition-all hover:bg-slate-700 py-[7px] px-[25px]" key={language.id} onClick={() => setLanguage(language.iso)}>{language.iso}</button>
            ))}
            <button 
              className="w-[85%] flex justify-center items-center bg-slate-950 m-auto py-[7px] mb-[7px] rounded-md" 
              onClick={() => setDisplay({...display, popup: !display.popup})}>
                <PlusIcon />
            </button>
          </div>
        }
      </div>
      {display.popup && <LanguageEditor languages={languages} setLanguages={setLanguages}/>}
    </>
  )
}

export default LanguageSelector