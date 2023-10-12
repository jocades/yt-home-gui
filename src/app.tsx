import { PageHeader } from './components/layout/page-header'
import { useEffect } from 'react'
import { TailwindIndicator } from './components/tailwind-indicator'

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('class', 'light')
  }, [])

  return (
    <>
      <div className='max-h-screen flex flex-col'>
        <PageHeader />
      </div>
      <TailwindIndicator />
    </>
  )
}
