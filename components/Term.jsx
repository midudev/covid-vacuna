
import { ModalContext } from 'contexts/modal.context'
import { useContext } from 'react'
import styles from 'styles/Term.module.css'

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
    <button className={styles.buttonHelper} title={title} onClick={(ev) => handleClick(ev)}>❔</button>
  )
}
