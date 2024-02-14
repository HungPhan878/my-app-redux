/* eslint-disable prettier/prettier */
import {
  increaseType,
  decreaseType,
  increaseXType
} from '../types/reducerTypes'

// actions
const increaseAction = () => {
  return { type: 'increase' } as increaseType
}

const decreaseAction = () => {
  return { type: 'decrease' } as decreaseType
}

const increaseXAction = (payload: number) => {
  return {
    type: 'increaseX',
    payload
  } as increaseXType
}

export { increaseAction, decreaseAction, increaseXAction }
