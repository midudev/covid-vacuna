// extracted from https://usehooks-typescript.com/react-hook/use-intersection-observer
import { useRef, useEffect, useState } from 'react'

function useIntersectionObserver ({
  elementRef,
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false
}) {
  const observer = useRef(null)
  const [entry, setEntry] = useState()
  const isClient = typeof window !== 'undefined'
  const hasIOSupport = isClient && !!window.IntersectionObserver
  const noUpdate = entry?.isIntersecting && freezeOnceVisible

  const IOOptions = { threshold, root, rootMargin }

  const updateEntry = ([entry]) => {
    setEntry(entry)
  }

  useEffect(
    function initIntersectionObserver () {
      // DOM Ref
      const node = elementRef?.current

      if (!hasIOSupport || noUpdate || !node) {
        return
      }

      // delete the old observer before creating a new one
      if (observer.current) observer.current.disconnect()
      // eslint-disable-next-line no-undef
      observer.current = new IntersectionObserver(updateEntry, IOOptions)

      // ensure the rest of useEffect use the same observer
      const { current: currentObserver } = observer
      currentObserver.observe(node)

      return () => {
        currentObserver.disconnect()
      }
    },
    [elementRef, threshold, root, rootMargin, noUpdate]
  )

  return [!!entry?.isIntersecting, entry]
}
export default useIntersectionObserver
