
import { ModalContext } from 'contexts/modal.context'
import { useContext } from 'react'

// include styles
import 'rodal/lib/rodal.css'

export const Term = ({ children, title }) => {
  const { visible, setVisible, setTerm } = useContext(ModalContext)

  const handleClick = (ev) => {
    ev.preventDefault()
    setTerm(children)
    setVisible(!visible)
  }

  return (
    <>
      <button title={title} onClick={(ev) => handleClick(ev)}>❔</button>
    </>
  )
}
