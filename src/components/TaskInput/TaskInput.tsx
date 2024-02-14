import React, { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

// components
import { Todo } from '~/@types/todo.type'
import connect, { ExtraInfoTypes } from '../HOC/connect'

// scss
import styles from './TaskInput.module.scss'
import { TodoTypes } from '~/Proptypes/todo.proptype'

const cx = classNames.bind(styles)

interface TaskInputProps extends ExtraInfoTypes {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  finishedTodo: () => void
  editTodo: (name: string) => void
}

function TaskInput(props: TaskInputProps) {
  const [name, setName] = useState<string>('')
  const { addTodo, currentTodo, finishedTodo, editTodo } = props
  const inputRef = useRef(null)

  // console.log(inputRef)
  // handle function
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (currentTodo) {
      editTodo(value)
    }
    setName(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishedTodo()
    } else {
      addTodo(name)
    }
    setName('')
    // inputRef.current.onFocus()
  }

  return (
    <form className={cx('task-form')} onSubmit={handleSubmit}>
      {/* eslint-disable-next-line prettier/prettier */}
      <input
        type='text'
        placeholder='Caption goes here'
        ref={inputRef}
        className={cx('task-input')}
        value={currentTodo ? currentTodo.name : name}
        onChange={handleChangeInput}
      />
      <button type='submit' className={cx('task-btn')}>
        {currentTodo ? '✅' : '➕'}
      </button>
    </form>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
  finishedTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
}

export default connect(TaskInput)
