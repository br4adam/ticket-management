import Priority from "./Priority"

const priorityLevels = [
  { priority: "low", description: "Low priority level is used for errors or issues that have a minor impact on the functionality of the system or application. They can be addressed at a later time and do not require immediate attention. Low priority issues are typically cosmetic or minor bugs that do not significantly affect the user's ability to use the system or application." },
  { priority: "medium", description: "Medium priority level is used for errors or issues that have a moderate impact on the functionality of the system or application. These issues require attention within a reasonable timeframe, but they do not necessarily require an immediate fix. Medium priority issues may impact some users or cause inconvenience, but they are not critical to the overall functionality of the system." },
  { priority: "high", description: "High priority level is used for errors or issues that have a severe impact on the functionality of the system or application. These issues require immediate attention and should be addressed as soon as possible. These issues may cause system failure, data loss, or significant downtime. They can impact a large number of users and require urgent action to restore the system to a working state." }
]

const PriorityLevels = () => {
  return (
    <section className="priority-levels container">
      <h2>Priority levels</h2>
      <div>
        { priorityLevels.map(item => <Priority key={item.priority} item={item} />) }
      </div>
    </section>
  )
}

export default PriorityLevels