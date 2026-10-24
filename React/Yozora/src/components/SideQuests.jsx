import QuestList from './QuestList'

function SideQuests() {
  return (
    <QuestList
      title="Side Quests"
      blurb="Detours worth taking: hobbies, experiments and little adventures."
      storageKey="yozora-side"
      placeholder="e.g. Try a new recipe"
      suggestions
    />
  )
}

export default SideQuests
