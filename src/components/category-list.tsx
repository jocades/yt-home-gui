import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useReducer, useRef } from 'react'

interface CategoryListProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const OFFSET_X = 200

export function CategoryList(
  { categories, selected, onSelect }: CategoryListProps,
) {
  const [showLeftArrow, toggleLeftArrow] = useReducer((x) => !x, true)
  const [showRightArrow, toggleRightArrow] = useReducer((x) => !x, false)

  const { translate, translateX } = useTranslate({ x: 300, y: 0 })

  return (
    <div className='relative overflow-x-hidden'>
      <div
        className='flex whitespace-nowrap w-[max-content] gap-3 transition-transform'
        style={{ transform: `translateX(-${translate.x}px)` }}
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
              if (translationX <= 0) translateX(translationX)
              else translateX(0)
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
