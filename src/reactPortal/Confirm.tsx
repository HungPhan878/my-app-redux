import React from 'react'
import classNames from 'classnames/bind'

import { createPortal } from 'react-dom'
// scss
import styles from './Confirm.module.scss'

const cx = classNames.bind(styles)

export default function Confirm() {
  return createPortal(
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>Confirm</div>
    </div>,
    document.body
  )
}
