
import { ModalContext } from 'contexts/modal.context'
import { useContext } from 'react'
import Rodal from 'rodal'

// include styles Rodal (modal)
import 'rodal/lib/rodal.css'

export const TermModal = () => {
  const { visible, setVisible, term } = useContext(ModalContext)

  return (
    <Rodal customStyles={{ position: 'sticky', top: '20%' }} visible={visible} onClose={() => setVisible(false)}>
      {term}
    </Rodal>
  )
}
