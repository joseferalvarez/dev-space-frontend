import { useState } from 'react'
import './App.css'
import LanguageSelector from './components/LanguageSelector';

const App = () => {
  const [language, setLanguage] = useState();
  return (
    <div>
      <p>Current language: {language ? language : ''}</p>
      <LanguageSelector language={language} setLanguage={setLanguage} />
    </div>
  )
}

export default App
