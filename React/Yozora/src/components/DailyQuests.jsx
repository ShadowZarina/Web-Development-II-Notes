import QuestList from './QuestList'

function DailyQuests() {
  return (
    <QuestList
      title="Daily Quests"
      blurb="Small habits that keep your light burning, one night at a time."
      storageKey="yozora-daily"
      placeholder="e.g. Drink water, stretch, read 10 pages"
    />
  )
}

export default DailyQuests
