
import React, { createContext, useState } from 'react'


export const forgotPasswordContext = createContext()

export default function ForgotPasswordContext({children}) {
    const [isVerified,setIsVerified] = useState(false)

    const data = {
        isVerified,
        setIsVerified
    }
  return (

    <forgotPasswordContext.Provider value={data}>
        {children}
    </forgotPasswordContext.Provider>
  )
}

