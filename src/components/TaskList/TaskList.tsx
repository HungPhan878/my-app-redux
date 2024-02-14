/* eslint-disable prettier/prettier */
// libraty
import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

// components
import { Todo } from '~/@types/todo.type'

// scss
import styles from './TaskList.module.scss'
import { TodoTypes } from '~/Proptypes/todo.proptype'

const cx = classNames.bind(styles)

interface TaskListProps {
  title?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { title, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

  // handle fun
  const handleChangeCheckbox =
    (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleDoneTodo(idTodo, event.target.checked)
    }
  return (
    <div>
      {/* eslint-disable-next-line prettier/prettier */}
      <h2 className={cx('tasks-heading')}>
        {title ? 'Hoan Thanh' : 'Chua Hoan Thanh'}
      </h2>
      {todos.map((todo) => (
        <div className={cx('tasks')} key={todo.id}>
          <div className={cx('task-item')}>
            {/* eslint-disable-next-line prettier/prettier */}
            <input
              type='checkbox'
              name='checkbox'
              id='checkbox'
              checked={todo.done}
              onChange={handleChangeCheckbox(todo.id)}
            />
            <span
              className={cx(
                'task-item__heading',
                title ? 'task-item__heading--completed' : ''
              )}
            >
              {todo.name}
            </span>
            <div className={cx('task-item__action')}>
              <button
                className={cx('task-item__btn')}
                onClick={() => startEditTodo(todo.id)}
              >
                🖋
              </button>
              <button
                className={cx('task-item__btn')}
                onClick={() => deleteTodo(todo.id)}
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

TaskList.propType = {
  title: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoTypes),
  handleDoneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}
