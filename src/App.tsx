import { useState } from 'react'
import './App.css'
import LanguageSelector from './components/languages/LanguageSelector';

const App = () => {
  const [language, setLanguage] = useState();
  return (
    <div className='bg-slate-950 w-screen h-screen flex justify-center items-center'>
      <div className='bg-slate-900 w-[90%] h-[90%] rounded-lg border-[1px] border-slate-600'>
        <div className='w-[100%] border-b-[1px] border-slate-600 flex justify-between items-center py-[10px] px-[30px]'>
          <p>alvaraaz</p>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </div>
  )
}

export default App;
