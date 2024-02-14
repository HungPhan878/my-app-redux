// eslint-disable-next-line prettier/prettier
import {
  increaseType,
  decreaseType,
  increaseXType
} from '../types/reducerTypes'

export const initialAge = { age: 24 }

export const init = (initialArg: typeof initialAge) => ({
  ...initialArg,
  age: initialArg.age + 10
})

type ActionType = increaseType | decreaseType | increaseXType

// function handler Reducer

const reducer = (state: typeof initialAge, actions: ActionType) => {
  if (actions.type === 'increase') {
    return { ...state, age: state.age + 1 }
  } else if (actions.type === 'decrease') {
    return { ...state, age: state.age - 1 }
  } else if (actions.type === 'increaseX') {
    return { ...state, age: state.age + actions.payload }
  }

  return state
}

export const logger = () => {
  return (state: typeof initialAge, actions: ActionType) => {
    console.group(actions.type)
    console.log('PrevState: ', state)

    const nextState = reducer(state, actions)
    console.log('NextState: ', nextState)
    console.groupEnd()

    return nextState
  }
}

export default reducer
