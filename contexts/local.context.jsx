import React, { useState, createContext } from 'react'

export const LocaleContext = createContext()

export const LocaleContextProvider = props => {
  const [locale, setLocale] = useState('es-ES')

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {props.children}
    </LocaleContext.Provider>
  )
}
