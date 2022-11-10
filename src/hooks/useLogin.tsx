import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { getRequestConfig, storeInBrowserStorage } from '../utils/utils'
import { env } from '../config/config'
import { ROUTES, STORAGE_KEY } from '../config/consts'



export const useLogin = () => {

// console.log('env',  process.env.REACT_APP_BASE_URL);

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()

    const MAX_LENGTH = 8
   

    const login = async (username: string, password: string ) => {
        setError(null)
        setIsPending(true)

        const config = getRequestConfig({
            method: 'POST',
            body: JSON.stringify({ username: username, password: password})
        })

            const rawResponse = await fetch(`${env.API_URL}${ROUTES.login}`, config)
            const response = await rawResponse.json()
            const token = response.token
            
            storeInBrowserStorage(STORAGE_KEY.Token, token)

            dispatch({ 
                type: 'USER_AUTH', 
                payload: token
            })

            // console.log('rawResponse: ', rawResponse);
            // console.log('response: ', response);
            // console.log('token: ', token);
            // console.log('error: ', response.message);

            const error = response.message
            if (error && username.length > MAX_LENGTH && password.length > MAX_LENGTH) {
                setError(error)
            }                  
    }   

  return { login, error, isPending } 
}

