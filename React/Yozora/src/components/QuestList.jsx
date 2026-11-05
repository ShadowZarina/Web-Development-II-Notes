import { useEffect, useState } from 'react'

const FILMS_URL = "https://swapi.info/api/films"

// Reads saved tasks so they survive switching routes and refreshing the page
function loadTasks(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function QuestList({ title, blurb, storageKey, placeholder, suggestions = false }) {
  const [tasks, setTasks] = useState(() => loadTasks(storageKey))
  const [text, setText] = useState('')
  const [loadingIdea, setLoadingIdea] = useState(false)
  const [ideaError, setIdeaError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks))
    } catch {
      // Storage unavailable (e.g. private mode) - the list still works in memory
    }
  }, [storageKey, tasks])

  const addTask = (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: crypto.randomUUID(), text: trimmed, done: false }])
    setText('')
    setIdeaError('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // AJAX: fetch Studio Ghibli films and turn a random one into a quest idea
  const suggestQuest = async () => {
    setLoadingIdea(true)
    setIdeaError('')
    try {
      const response = await fetch(FILMS_URL)
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      const films = await response.json()
      const film = films[Math.floor(Math.random() * films.length)]
      setText(`Watch ${film.title}`)
    } catch {
      setIdeaError('Could not fetch a suggestion. Try again in a moment.')
    } finally {
      setLoadingIdea(false)
    }
  }

  const remaining = tasks.filter((task) => !task.done).length

  return (
    <div className="quest-list">
      <div className="quest-list-heading">
        <h2 className="quest-list-title">{title}</h2>
        <span className="quest-list-count">
          {remaining} of {tasks.length} left
        </span>
      </div>
      <p className="quest-list-blurb">{blurb}</p>

      <form className="quest-form" onSubmit={addTask}>
        <input
          className="quest-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={placeholder}
          aria-label={`Add to ${title}`}
        />
        <button type="submit" className="quest-add">
          Add
        </button>
      </form>

      {suggestions && (
        <div className="quest-suggest">
          <button
            type="button"
            className="quest-suggest-button"
            onClick={suggestQuest}
            disabled={loadingIdea}
          >
            {loadingIdea ? 'Searching the stars...' : 'Suggest a quest'}
          </button>
          {ideaError && (
            <span className="quest-error" role="alert">
              {ideaError}
            </span>
          )}
        </div>
      )}

      {tasks.length === 0 ? (
        <p className="quest-empty">No quests yet. The sky is clear.</p>
      ) : (
        <ul className="quest-items">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'quest-item done' : 'quest-item'}>
              <label className="quest-label">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="quest-text">{task.text}</span>
              </label>
              <button
                type="button"
                className="quest-delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.text}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default QuestList
