import { useState } from 'react'

export default function useIsLoading(){
    const [state, setState] = useState()

    const startLoading = () => setState(true)

    const endLoading = () => setState(false)

    return {
        isLoading: state,
        startLoading,
        endLoading
    }
}