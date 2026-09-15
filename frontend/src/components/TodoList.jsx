import TodoItem from './TodoItem'

export default function TodoList({
  todos,
  onEdit,
  onToggle,
  onDelete,
  actionLoadingId,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-icon">✓</div>
        <h3>No todos yet</h3>
        <p>Add your first task above and start getting things done.</p>
      </div>
    )
  }

  return (
    <section className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
          actionLoading={actionLoadingId === todo.id}
        />
      ))}
    </section>
  )
}
