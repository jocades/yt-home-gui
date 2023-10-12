import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useReducer, useRef, useState } from 'react'

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

  const { translate, translateX } = useTranslate({ x: 300, y: 0 })

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
        {categories.map((category, i) => (
          <Button
            key={i}
            onClick={() => onSelect(category)}
            variant={category === selected ? 'default' : 'secondary'}
            className='py-1 px-2.5 rounded-lg whitespace-nowrap text-sm'
          >
            {category}
          </Button>
        ))}
      </div>
      {showLeftArrow && (
        <div className='absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-background from-50% to-transparent w-24 h-full'>
          <Button
            onClick={() => {
              const translationX = translate.x - OFFSET_X
              if (translationX <= 0) translateX(0)
              else translateX(translationX)
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
              if (!containerRef.current) return

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

interface Vector {
  x: number
  y: number
}

interface TranslateAction {
  type: 'x' | 'y'
  value: number
}

function translateReducer(state: Vector, action: TranslateAction): Vector {
  switch (action.type) {
    case 'x':
      return { ...state, x: action.value }
    case 'y':
      return { ...state, y: action.value }
    default:
      return state
  }
}

/**
 * Utility hook to translate in X or Y direction forcing a re-render
 */
function useTranslate(initialValue: Vector) {
  const [translate, dispatch] = useReducer(translateReducer, initialValue)

  return {
    translate,
    translateX: (value: number) => {
      dispatch({ type: 'x', value })
    },
    translateY: (value: number) => {
      dispatch({ type: 'y', value })
    },
  }
}

// function useToggle(initialValue = false) {
//   const [value, toggle] = useReducer(
//     (s: boolean, x?: boolean) => x ?? !s,
//     initialValue,
//   )
//
//   return [value, toggle] as const
// }

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  return [value, (x?: boolean) => setValue((prev) => x ?? !prev)] as const
}
