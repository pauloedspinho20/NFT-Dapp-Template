import { useEffect } from 'react';

const useHtmlLang = () => useEffect(() => {
  document.documentElement.lang = 'en';
}, []);

export default useHtmlLang;
