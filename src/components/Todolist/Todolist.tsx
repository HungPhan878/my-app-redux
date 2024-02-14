/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

// scss
import styles from './Todolist.module.scss'

// components

import TaskInput from '~/components/TaskInput'
import TaskList from '~/components/TaskList'
import { Todo } from '~/@types/todo.type'

const cx = classNames.bind(styles)

type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosObj: Todo[] = JSON.parse(localStorage.getItem('todos') ?? '[]')
  const newTodos = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodos))
}

export default function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const completed = todos.filter((todo) => todo.done)
  const unfinished = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosObj = JSON.parse(localStorage.getItem('todos') ?? '[]')
    setTodos(todosObj)
  }, [])

  // handle function
  const addTodo = (name: string) => {
    const handler = (todosObj: Todo[]) => [...todosObj, todo]

    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos(handler)

    // save to localStorage
    syncReactToLocal(handler)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }

    setTodos(handler)

    syncReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    const findTodo = todos.find((todo) => todo.id === id)
    if (findTodo) {
      setCurrentTodo(findTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishedTodo = () => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    }

    setTodos(handler)
    setCurrentTodo(null)

    // set lai local
    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    const handler = (todosObj: Todo[]) => {
      const findIndex = todosObj.findIndex((todo) => todo.id === id)
      if (findIndex > -1) {
        const result = [...todosObj]
        result.splice(findIndex, 1)
        return result
      }
      return todosObj
    }

    if (currentTodo) {
      setCurrentTodo(null)
    }

    setTodos(handler)

    // delete in local
    syncReactToLocal(handler)
  }

  return (
    <div className={cx('todo-container')}>
      <h1 className={cx('todo-heading')}>To do List</h1>
      <TaskInput
        addTodo={addTodo}
        currentTodo={currentTodo}
        finishedTodo={finishedTodo}
        editTodo={editTodo}
        
      />
      {/* eslint-disable-next-line prettier/prettier */}
      <TaskList
        todos={unfinished}
        handleDoneTodo={handleDoneTodo}
        startEditTodo={startEditTodo}
        deleteTodo={deleteTodo}
      />
      <TaskList
        title
        todos={completed}
        handleDoneTodo={handleDoneTodo}
        startEditTodo={startEditTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}
