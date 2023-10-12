import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setValue(JSON.parse(item))
  }, [key])

  return [
    value,
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    },
  ] as const
}
