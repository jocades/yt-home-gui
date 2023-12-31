import { useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  return [value, (v?: boolean) => setValue((prev) => v ?? !prev)] as const
}
