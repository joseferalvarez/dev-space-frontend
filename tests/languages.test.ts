import {test, expect} from 'vitest';
import {getLanguages, postLanguage} from '../src/api/language-api'
import { Language } from '../src/classes/languages';

test(`Get languages`, async () => {
  const languages = await getLanguages();
  if(languages){
    languages.forEach((language) => {
      expect(language).toBeInstanceOf(Language)
    })
  }else{
    expect(languages).toHaveLength(0);
  }
});

test(`Post new language`, async () => {
  const language = await postLanguage('en', 'english', 'en', 'english');
  expect(language).toBeInstanceOf(Language);
});