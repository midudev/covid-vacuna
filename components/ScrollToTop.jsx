import ButtonScrollTop from 'components/icons/ButtonScrollTop'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useRef } from 'react'

export default function ScrollToTop ({ showButtonAt }) {
  const chivatoRef = useRef()
  const [isIntersecting] = useIntersectionObserver({ elementRef: chivatoRef })

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div ref={chivatoRef} />
      <ButtonScrollTop
        fill='#2c7cdc'
        height={45}
        onClick={handleClick}
        show={!isIntersecting}
        width={45}
      />
      <style jsx>{`
        div {
          opacity: 0;
          height: 1px;
          left: 1px;
          position: absolute;
          top: ${showButtonAt}px;
          width: 1px;
        }
      `}
      </style>
    </>
  )
}
