import React, { useState, createContext } from 'react'

export const ModalContext = createContext()

export const ModalContextProvider = props => {
  const [term, setTerm] = useState('Test')
  const [visible, setVisible] = useState(false)

  return (
    <ModalContext.Provider value={{ visible, setVisible, term, setTerm }}>
      {props.children}
    </ModalContext.Provider>
  )
}
