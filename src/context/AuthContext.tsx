import { createContext, useReducer, useEffect, FC } from "react";
import { getValueForKeyInBrowserStorage } from "../utils/utils";

type AuthCntx = {
    token: string | null
    dispatch: React.Dispatch<Actions>
}

type State = {
    token: string | null
}

type Actions = { type: 'USER_AUTH'; payload: string | null}

export const AuthContext = createContext({} as AuthCntx)


export const authReducer = (state: State, action: Actions) => {
    
    switch (action.type) {
        case 'USER_AUTH':
            return { ...state, token: action.payload }
         default: 
            return state
    }
}

export const AuthContextProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        token: null                   
    })

    useEffect(() => {
        const token = getValueForKeyInBrowserStorage('token')
        dispatch({ 
            type: 'USER_AUTH', 
            payload: token
        })
    }, [])

    // console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}