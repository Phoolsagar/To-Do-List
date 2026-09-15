const formatDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

export default function TodoItem({ todo, onEdit, onToggle, onDelete, actionLoading }) {
  return (
    <article className={`todo-item card ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-heading">
          <h3>{todo.title}</h3>
          <span className={`status-badge ${todo.completed ? 'done' : 'pending'}`}>
            {todo.completed ? 'Completed' : 'Pending'}
          </span>
        </div>

        {todo.description && <p className="todo-description">{todo.description}</p>}

        <p className="todo-date">Created: {formatDate(todo.createdAt)}</p>
      </div>

      <div className="todo-actions">
        <button
          className="secondary-button"
          onClick={() => onEdit(todo)}
          disabled={actionLoading}
        >
          Edit
        </button>

        <button
          className={todo.completed ? 'secondary-button' : 'success-button'}
          onClick={() => onToggle(todo)}
          disabled={actionLoading}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>

        <button
          className="danger-button"
          onClick={() => onDelete(todo)}
          disabled={actionLoading}
        >
          Delete
        </button>
      </div>
    </article>
  )
}
