import React, { useReducer } from 'react'

// components
import reducer, { init, initialAge, logger } from './reducer/reducer'
// eslint-disable-next-line prettier/prettier
import {
  increaseAction,
  decreaseAction,
  increaseXAction
} from './actions/actions'

// initialValue

export default function CalculatorAge() {
  // useReducer
  const [state, dispatch] = useReducer(logger(), initialAge, init)

  // handler event function
  const increase = () => {
    dispatch(increaseAction())
  }

  const decrease = () => {
    dispatch(decreaseAction())
  }

  const increaseX = (value: number) => {
    dispatch(increaseXAction(value))
  }

  return (
    <div>
      <div>Age: {state.age}</div>
      <div>
        <button onClick={increase}>Increase</button>
      </div>

      <div>
        <button onClick={() => increaseX(7)}>Increase X</button>
      </div>

      <div>
        <button onClick={decrease}>Decrease</button>
      </div>
    </div>
  )
}
