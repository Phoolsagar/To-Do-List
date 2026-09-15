import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import EditTodoModal from '../components/EditTodoModal'
import {
  completeTodo,
  createTodo,
  deleteTodo,
  getApiErrorMessage,
  getTodos,
  uncompleteTodo,
  updateTodo,
} from '../services/todoService'

export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [error, setError] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const [editLoading, setEditLoading] = useState(false)

  const loadTodos = useCallback(async () => {
    try {
      setError('')
      const response = await getTodos()
      setTodos(response.data)
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  const pendingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  )

  const completedCount = todos.length - pendingCount

  const handleCreate = async (data) => {
    try {
      setFormLoading(true)
      setError('')
      const response = await createTodo(data)
      setTodos((current) => [response.data, ...current])
      return true
    } catch (err) {
      setError(getApiErrorMessage(err))
      return false
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = async (data) => {
    if (!editingTodo) return

    try {
      setEditLoading(true)
      setError('')
      const response = await updateTodo(editingTodo.id, data)
      setTodos((current) =>
        current.map((todo) => (todo.id === editingTodo.id ? response.data : todo))
      )
      setEditingTodo(null)
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setEditLoading(false)
    }
  }

  const handleToggle = async (todo) => {
    try {
      setActionLoadingId(todo.id)
      setError('')
      const response = todo.completed
        ? await uncompleteTodo(todo.id)
        : await completeTodo(todo.id)

      setTodos((current) =>
        current.map((item) => (item.id === todo.id ? response.data : item))
      )
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleDelete = async (todo) => {
    const confirmed = window.confirm(
      `Delete "${todo.title}"? This action cannot be undone.`
    )
    if (!confirmed) return

    try {
      setActionLoadingId(todo.id)
      setError('')
      await deleteTodo(todo.id)
      setTodos((current) => current.filter((item) => item.id !== todo.id))
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setActionLoadingId(null)
    }
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">Task management</p>
            <h1>Get things done.</h1>
            <p className="hero-text">
              A simple full-stack todo manager backed by Spring Boot and MySQL.
            </p>
          </div>
        </section>

        <TodoForm onSubmit={handleCreate} loading={formLoading} />

        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button onClick={() => setError('')} aria-label="Dismiss error">×</button>
          </div>
        )}

        <section className="stats">
          <div className="stat-card card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="stat-card card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="stat-card card">
            <span>Total</span>
            <strong>{todos.length}</strong>
          </div>
        </section>

        <section className="list-section">
          <div className="section-heading">
            <div>
              <h2>Your Todos</h2>
              <p>Manage your tasks and keep your progress visible.</p>
            </div>
            <button className="secondary-button" onClick={loadTodos} disabled={loading}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="loading-state card">
              <div className="spinner" />
              <p>Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onEdit={setEditingTodo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              actionLoadingId={actionLoadingId}
            />
          )}
        </section>
      </main>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onSave={handleEdit}
          onClose={() => setEditingTodo(null)}
          loading={editLoading}
        />
      )}
    </>
  )
}
