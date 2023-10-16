import { createContext } from 'react';

interface ContextProps {
    isHome: boolean;
    setIsHome: (settingIsHome: boolean) => void;
    isDarkTheme: boolean;
    setIsDarkTheme: ( settingIsDarkTheme: boolean ) => void;
}

export const LayoutContext = createContext({} as ContextProps);