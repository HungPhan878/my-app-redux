import React from 'react'
import { debug, log } from '~/constains'

export interface ExtraInfoTypes {
  debug: boolean
  log: (value: any) => void
}

export default function connect<T>(Component: React.ComponentType<T & ExtraInfoTypes>) {
  return function (props: Omit<T, keyof ExtraInfoTypes>) {
    const _props = props as T

    return <Component {..._props} debug={debug} log={log} />
  }
}
