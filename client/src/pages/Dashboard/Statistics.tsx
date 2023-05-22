import { FC } from "react"
import { getStatistics, type StatisticListType } from "../../api/charts"
import { OpenPanelFilledTop, OpenPanelFilledBottom } from "@carbon/icons-react"
import Stat from "./Stat"
import useApi from "../../hooks/useApi"
import { useTranslation } from "react-i18next"

const initialState = [{ status: "total", count: 0 }, { status: "open", count: 0 }, { status: "pending", count: 0 }, { status: "closed", count: 0 }]

type Props = {
  showCharts: boolean
  setShowCharts: React.Dispatch<React.SetStateAction<boolean>>
}

const Statistics: FC<Props> = ({ showCharts, setShowCharts }) => {
  const { data: statistics } = useApi<StatisticListType>(getStatistics, initialState)
  const { t } = useTranslation()

  const toggle = () => setShowCharts(prev => !prev)

  return (
    <section className="statistics">
      <div className="wrapper">
        <div className="titlebar">
          <h1>{t("dashboard.title")}</h1>
          { showCharts 
            ? <button className="solid" onClick={toggle}><OpenPanelFilledTop />{t("dashboard.hide")}</button>
            : <button className="solid" onClick={toggle}><OpenPanelFilledBottom />{t("dashboard.show")}</button> }
        </div>
        <div className="statgrid">
        { statistics && statistics.map(stat => <Stat key={stat.status} stat={stat} />)}
        </div>
      </div>
    </section>
  )
}

export default Statistics