import { useEffect, useState } from 'react'

export function useGeolocation(options?: PositionOptions) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [coords, setCoords] = useState({} as GeolocationCoordinates)

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords(pos.coords)
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
      options,
    )

    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, coords }
}
