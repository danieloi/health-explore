import { useState, useCallback, useMemo } from 'react'

const useToggle = () => {
  const [state, setState] = useState(false)

  const toggleState = useCallback(() => {
    setState(prevState => !prevState)
  }, [])

  const values = useMemo(
    () => ({
      state,
      toggleState
    }),
    [state, toggleState]
  )

  return values
}

export default useToggle
