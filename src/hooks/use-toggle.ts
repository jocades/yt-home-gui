import { useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  return [value, (x?: boolean) => setValue((prev) => x ?? !prev)] as const
}
