import { FC, useState } from "react"
import { createCompany } from "../../api/companies"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

type Props = {
  refresh: () => Promise<void>
}

const AddCompany: FC<Props> = ({ refresh }) => {
  const [ newCompany, setNewCompany ] = useState<string>("")
  const { t } = useTranslation()

  const saveCompany = async () => {
    if (newCompany.length < 3) return toast.error("This company name is too short!")
    const response = await createCompany(newCompany)
    console.log(response)
    if (!response.success) return toast.error("Unable to create company!")
    refresh()
    setNewCompany("")
  }

  return (
    <div className="add-company">
      <input type="text" placeholder={t("onboarding.placeholder")} value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
      <button className="solid" disabled={!newCompany} onClick={saveCompany}>{t("onboarding.add-button")}</button>
    </div>
  )
}

export default AddCompany