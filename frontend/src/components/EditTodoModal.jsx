import { useEffect, useState } from 'react'

export default function EditTodoModal({ todo, onSave, onClose, loading }) {
  const [form, setForm] = useState({
    title: todo.title,
    description: todo.description || '',
  })

  useEffect(() => {
    setForm({
      title: todo.title,
      description: todo.description || '',
    })
  }, [todo])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.title.trim()) return
    await onSave({
      title: form.title.trim(),
      description: form.description.trim(),
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal card" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Edit Todo</h2>
            <p>Update the title or description.</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={150}
            required
            autoFocus
          />

          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            maxLength={2000}
          />

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-button" disabled={loading || !form.title.trim()}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
