import { useState } from "react"
import { removeFromBrowserStorage } from "../utils/utils"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {

    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)
     
        try {
            dispatch({ type: 'USER_AUTH', payload: null })
            removeFromBrowserStorage('token')
        } 
        catch(err) {
                console.log((err as Error).message);
                setError((err as Error).message)
                setIsPending(false)           
        }
    }

    return { logout, error, isPending }
}