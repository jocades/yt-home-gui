import { Header } from './components/layout/header'
import { useState } from 'react'
import { TailwindIndicator } from './components/tailwind-indicator'
import { CategoryList } from './components/category-list'
import { categories, videos } from './assets/data'
import { ThemeProvider } from './contexts/theme'
import { useRenderCount } from './hooks/use-render-count'
import { VideoItem } from './components/video-item'
import { SideBar } from './components/layout/side-bar'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const renderCount = useRenderCount()

  return (
    <ThemeProvider>
      <div className='max-h-screen flex flex-col p-2 md:p-4'>
        <Header />
        <div className='grid grid-cols-[auto,1fr] flex-grow overflow-auto'>
          <SideBar />
          <div className='overflow-x-hidden px-8 pb-4'>
            <div className='sticky top-0 z-10 pb-4 bg-background'>
              <CategoryList
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
              {videos.map((video) => <VideoItem key={video.id} {...video} />)}
            </div>
          </div>
        </div>
        {renderCount}
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  )
}
