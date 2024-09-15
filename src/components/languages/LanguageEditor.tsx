import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import PlusIcon from "../icons/PlusIcon";
import { postLanguage } from "../../api/language-api";

const LanguageEditor = ({languages, setLanguages}) => {

  const [languageEdit, setLanguageEdit] = useState(languages.map((lang) => { return {...lang, edit: false}}));
  const [newLanguage, setNewLanguage] = useState<string>("");

  const changeLanguageEdit = (iso: string) => {
    setLanguageEdit(languageEdit.map((lang) => {
      if(lang.iso === iso){
        return {...lang, edit: !lang.edit}
      }else{
        return lang;
      }
    }));
  }

  const addLenguage = async (newLanguage) => {
    const lang = await postLanguage(newLanguage);
    setLanguageEdit([...languageEdit, {...lang, edit: false}]);
    setLanguages([...languages, lang]);
    setNewLanguage("");
  }

  return (
    <div className="absolute bg-slate-800 rounded-sm border-[1px] border-slate-700 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[20px] min-w-[350px] gap-[10px] flex flex-col">
      {languageEdit.map(language => (
        <div key={language.id} className="flex justify-between items-center">
          <input type="text" value={language.iso} disabled={!language.edit} className={`${!language.edit ? 'border-transparent' : 'border-slate-300'} border-[1px] rounded-sm bg-transparent py-[5px] px-[10px] text-slate-300 uppercase`}/>
          <div className="flex items-center justify-center gap-[5px]">
            <button 
              className="bg-slate-950 py-[7px] px-[10px] rounded-md"
              onClick={() => changeLanguageEdit(language.iso)}
              >
                <EditIcon />
              </button>
            <button className="bg-slate-950 py-[7px] px-[10px] rounded-md"><DeleteIcon /></button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <input 
          className="border-[1px] rounded-sm bg-transparent py-[5px] px-[10px] text-slate-300 uppercase placeholder:capitalize"
          type="text"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          placeholder="New language"
        />
        <button 
          className="bg-slate-950 py-[7px] px-[10px] rounded-md"
          onClick={() => addLenguage(newLanguage)}>
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}

export default LanguageEditor;