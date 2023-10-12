import { useReducer } from 'react'

export interface Vector {
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
export function useTranslate(initialValue: Vector) {
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
