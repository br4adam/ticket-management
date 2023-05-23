import { useTranslation } from "react-i18next"
import Priority from "./Priority"

const PriorityLevels = () => {
  const { t } = useTranslation()
  
  const priorityLevels = [
    { priority: "low", title: t("priority.low"), description: t("priority.low-description") },
    { priority: "medium", title: t("priority.medium"), description: t("priority.medium-description") },
    { priority: "high", title: t("priority.high"), description: t("priority.high-description") }
  ]
  
  return (
    <section className="priority-levels container">
      <h2>{t("priority.title")}</h2>
      <div>
        { priorityLevels.map(item => <Priority key={item.priority} item={item} />) }
      </div>
    </section>
  )
}

export default PriorityLevels