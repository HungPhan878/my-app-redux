/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useTransition } from 'react'

function Logger({ name }: { name: string }) {
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    console.log('name', name)

    const result = []
    const SIZE = 9999
    for (let i = 0; i < SIZE; i++) {
      result.push(name)
    }
    setList(result)
  }, [name])

  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}

export default function UseTransition() {
  const [name, setName] = useState<string>('')
  const [deferredName, setDeferredName] = useState<string>('')
  const [pending, startTransition] = useTransition()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    startTransition(() => {
      setDeferredName(value)
    })
  }
  return (
    <div>
      <h1>Hello Baby</h1>
      <input
        type='text'
        name=''
        id=''
        value={name}
        onChange={handleChange}
        autoFocus
      />
      <Logger name={deferredName} />
    </div>
  )
}
