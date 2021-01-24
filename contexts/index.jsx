import { LocaleContextProvider } from './local.context'

export const MainContextProvider = ({ children }) => {
  return (
    <LocaleContextProvider>
      {children}
    </LocaleContextProvider>
  )
}
