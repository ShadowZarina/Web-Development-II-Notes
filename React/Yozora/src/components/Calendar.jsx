import { useState } from 'react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedDay, setSelectedDay] = useState(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Leading blanks so day 1 lands on the right weekday, then each day number
  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)

  const monthLabel = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const changeMonth = (offset) => {
    setViewDate(new Date(year, month + offset, 1))
    setSelectedDay(null)
  }

  const goToToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDay(today.getDate())
  }

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-arrow"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
        >
          &lsaquo;
        </button>
        <h2 className="calendar-title">{monthLabel}</h2>
        <button
          type="button"
          className="calendar-arrow"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          &rsaquo;
        </button>
      </div>

      <div className="calendar-grid calendar-weekdays">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="calendar-weekday">
            {weekday}
          </span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((day, index) =>
          day === null ? (
            <span key={`blank-${index}`} className="calendar-cell blank" />
          ) : (
            <button
              key={day}
              type="button"
              className={[
                'calendar-cell',
                isToday(day) ? 'today' : '',
                selectedDay === day ? 'selected' : '',
              ]
                .join(' ')
                .trim()}
              aria-pressed={selectedDay === day}
              aria-current={isToday(day) ? 'date' : undefined}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ),
        )}
      </div>

      <button type="button" className="calendar-today" onClick={goToToday}>
        Jump to today
      </button>
    </div>
  )
}

export default Calendar
