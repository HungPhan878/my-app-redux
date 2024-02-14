import React, { useRef } from 'react'

// components
import Input from './Input'

export default function AutomaticInput() {
  const inputFunctionRef = useRef<{
    type: () => void
  }>({ type: () => {} })

  const handleClick = () => {
    inputFunctionRef.current.type()
  }

  return (
    <div>
      <Input ref={inputFunctionRef} />

      <div className=''>
        <button onClick={handleClick}>Automatic Name</button>
      </div>
    </div>
  )
}
