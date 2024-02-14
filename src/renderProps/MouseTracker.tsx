/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import Abs from './Abs'

export interface positionType {
  x: number
  y: number
}

export default function MouseTracker({
  render
}: {
  render: (value: positionType) => JSX.Element
}) {
  const [position, setPosition] = useState<positionType>({ x: 0, y: 0 })

  const handleEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    })
    // setPosition(null)
  }

  return (
    <div onMouseMove={handleEvent}>
      <p style={{ color: 'red' }}>Mouse Tracker</p>
      {render(position)}
    </div>
  )
}
