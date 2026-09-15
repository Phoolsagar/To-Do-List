import { useState } from 'react'

const initialForm = { title: '', description: '' }

export default function TodoForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    const success = await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
    })

    if (success) setForm(initialForm)
  }

  return (
    <form className="todo-form card" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h2>Add a new todo</h2>
          <p>Capture the next thing you need to get done.</p>
        </div>
      </div>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter todo title"
        maxLength={150}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter description (optional)"
        rows="3"
        maxLength={2000}
      />

      <button className="primary-button" disabled={loading || !form.title.trim()}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  )
}
