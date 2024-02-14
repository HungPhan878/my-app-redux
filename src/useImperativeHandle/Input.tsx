/* eslint-disable prettier/prettier */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

interface InputProps {}

const Input = forwardRef<{ type: () => void }>((props: InputProps, ref) => {
  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const type = () => {
    let index = 0
    const name = 'Beautiful Rose'
    inputRef?.current?.focus()

    let interval: any = setInterval(() => {
      setValue(name.slice(0, index))
      if (index === name.length) {
        return clearInterval(interval)
      }
      index++
    }, 200)
  }

  useImperativeHandle(ref, () => {
    return { type }
  })

  return (
    <div>
      <input
        type='text'
        placeholder='Automatic enter name'
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
})

export default Input
