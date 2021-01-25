import useHasMounted from 'hooks/useHasMounted'

export default function ClientSideComponent ({ children }) {
  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null
  }
  return children
}
