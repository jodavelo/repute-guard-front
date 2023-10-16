import { FC, useReducer } from 'react'
import { LayoutContext, layoutReducer } from './'

export interface LayoutState {
    isHome: boolean;
    isDarkTheme: boolean;
}

const LAYOUT_INITIAL_STATE: LayoutState = {
    isHome: false,
    isDarkTheme: false
}

interface Props {
    children: JSX.Element
}

export const LayoutProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(layoutReducer, LAYOUT_INITIAL_STATE);

    const setIsHome = ( settingIsHome: boolean ) => {
        dispatch({ type: '[Layout] - Set is Home', payload: settingIsHome });
    }

    const setIsDarkTheme = (settingIsDarkTheme: boolean) => {
        dispatch({ type: '[Theme] - Set is Dark Theme', payload: settingIsDarkTheme });
    }

    return (
        <LayoutContext.Provider value={{
            ...state,

            // Methods
            setIsHome,
            setIsDarkTheme
        }}>
            { children }
        </LayoutContext.Provider>
    )
}