import { Header } from './components/layout/header'
import { useState } from 'react'
import { TailwindIndicator } from './components/tailwind-indicator'
import { CategoryList } from './components/category-list'
import { categories } from './assets/data'
import { ThemeProvider } from './contexts/theme'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <ThemeProvider>
      <div className='max-h-screen flex flex-col p-2 md:p-4'>
        <Header />
        <div className='grid grid-cols-[auto,1fr] flex-grow overflow-auto'>
          <div className='flex flex-col'>SIDEBAR</div>
          <div className='sticky top-0 z-10 px-8 pb-4 overflow-x-hidden'>
            <CategoryList
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  )
}
