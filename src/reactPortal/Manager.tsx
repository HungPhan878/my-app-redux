// library
import React from 'react'
import classNames from 'classnames/bind'

// components
import Sidebar from './Sidebar'
import Content from './Content'

// scss
import styles from './Manager.module.scss'

const cx = classNames.bind(styles)

export default function Manager() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('sidebar')}>
        <Sidebar />
      </div>

      <div className={cx('content')}>
        <Content />
      </div>
    </div>
  )
}
