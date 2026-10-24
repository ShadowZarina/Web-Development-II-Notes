import QuestList from './QuestList'

function MainQuests() {
  return (
    <QuestList
      title="Main Quests"
      blurb="The big goals that guide your journey, your North Star."
      storageKey="yozora-main"
      placeholder="e.g. Finish the capstone project"
    />
  )
}

export default MainQuests
