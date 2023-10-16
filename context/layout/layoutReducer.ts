
import { LayoutState } from './';

type LayoutActionType = 
    | { type: '[Layout] - Set is Home', payload: boolean }
    | { type: '[Theme] - Set is Dark Theme', payload: boolean }
    | { type: '[Theme] - Set is collapsed sidebar', payload: boolean }
    | { type: '[Theme] - Set is logged', payload: boolean }
    // | { type: '[Layout] - Unenable is Home',  }

export const layoutReducer = (state: LayoutState, action: LayoutActionType): LayoutState => {

    switch (action.type) {
        case '[Layout] - Set is Home':
            return {
                ...state,
                isHome: action.payload,
            }
        case '[Theme] - Set is Dark Theme':
            return {
                ...state,
                isDarkTheme: action.payload,
            }
        case '[Theme] - Set is collapsed sidebar':
            return {
                ...state,
                sideBarCollapsed: action.payload,
            }
        case '[Theme] - Set is logged':
            return {
                ...state,
                isLogged: action.payload,
            }
        // case '[Layout] - Unenable is Home':
        //     return {
        //         ...state,
        //         isHome: false
        //     }

        default:
            return state;
    }

}