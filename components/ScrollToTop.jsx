import ButtonScrollTop from 'components/icons/ButtonScrollTop.jsx'
import { useState, useEffect } from 'react'

export default function ScrollToTop ({ showButton }) {
  const [show, setShow] = useState(!showButton)

  useEffect(() => {
    if (showButton) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    if (window.pageYOffset > showButton) {
      !show && setShow(true)
    } else {
      show && setShow(false)
    }
  }

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {show && <ButtonScrollTop className='button' onClick={handleClick} width={45} height={45} fill='#2c7cdc' />}
    </>
  )
}
