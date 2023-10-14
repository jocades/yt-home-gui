import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useRef } from 'react'
import { useToggle } from '@/hooks/use-toggle'
import { useTranslate } from '@/hooks/use-translate'

interface CategoryListProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const OFFSET_X = 200

export function CategoryList(
  { categories, selected, onSelect }: CategoryListProps,
) {
  const [showLeftArrow, toggleLeftArrow] = useToggle()
  const [showRightArrow, toggleRightArrow] = useToggle()

  const { translate, translateX } = useTranslate({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target as HTMLDivElement
      const fullW = container.scrollWidth
      const visibleW = container.clientWidth

      toggleLeftArrow(translate.x > 0)
      toggleRightArrow(translate.x + visibleW < fullW)
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [categories, translate.x])

  return (
    <div ref={containerRef} className='relative overflow-x-hidden'>
      <div
        style={{ transform: `translateX(-${translate.x}px)` }}
        className='flex whitespace-nowrap w-[max-content] gap-3 transition-transform'
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelect(category)}
            variant={category === selected ? 'default' : 'secondary'}
            className='py-1 px-2.5 rounded-lg whitespace-nowrap text-sm'
          >
            {category}
          </Button>
        ))}
      </div>
      {showLeftArrow && (
        <div className='absolute left-0 top-1/2 -translate-y-1/2 w-24 h-full bg-gradient-to-r from-background from-50% to-transparent'>
          <Button
            onClick={() => {
              const translationX = translate.x - OFFSET_X
              if (translationX <= 0) {
                translateX(0)
              } else translateX(translationX)
            }}
            variant='ghost'
            size='icon'
            className='h-full aspect-square w-auto p-1.5'
          >
            <ChevronLeftIcon />
          </Button>
        </div>
      )}
      {showRightArrow && (
        <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background from-50% to-transparent w-24 h-full flex justify-end'>
          <Button
            onClick={() => {
              if (!containerRef.current) {
                return
              }

              const fullW = containerRef.current.scrollWidth
              const visibleW = containerRef.current.clientWidth

              const translationX = translate.x + OFFSET_X
              if (translationX + visibleW >= fullW) translateX(fullW - visibleW)
              else translateX(translationX)
            }}
            variant='ghost'
            size='icon'
            className='h-full aspect-square w-auto p-1.5'
          >
            <ChevronRightIcon />
          </Button>
        </div>
      )}
    </div>
  )
}
