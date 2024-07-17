import {createContext, useContext, useEffect, useState} from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  //내부적으로 어떤 상태인지 가지고 있는 state
  const [darkMode, setDarkMode] = useState(false);
  //그걸 toggle할 수 있는 함수
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev )
    updateDarkMode(!darkMode);
  };

  //처음 마운트 될 때 로컬스토리지를 읽어와서 적절하게 내부 상태를 업데이트해주고 html상태도 업데이트 해준다.
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  },[])

  return(
    //자식들이 사용 할 수 있도록 value로 제공
    <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  )

}

function updateDarkMode(darkMode) {
  //토글링 할 때 마다 html에 업데이트 해줄 뿐만 아니라 로컬스토리지에 저장도 해준다.
  if(darkMode){
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}


export const useDarkMode = () => useContext(DarkModeContext);