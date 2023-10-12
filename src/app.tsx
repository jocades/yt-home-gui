import { PageHeader } from './components/layout/page-header'
import { useEffect, useState } from 'react'
import { TailwindIndicator } from './components/tailwind-indicator'
import { CategoryList } from './components/category-list'
import { categories } from './assets/data'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <>
      <div className='max-h-screen flex flex-col p-2 md:p-4'>
        <PageHeader />
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
    </>
  )
}
