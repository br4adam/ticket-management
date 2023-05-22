import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "@carbon/icons-react"
import avatars from "../../assets/avatars"
import Avatar from "../../components/Avatar"
import CompanyTag from "./CompanyTag"
import AddCompany from "./AddCompany"
import { getCompanies, type CompanyType } from "../../api/companies"
import getFilename from "../../utils/getFilename"
import { user$, update } from "../../states/user"
import Loader from "../../components/Loader"
import useGlobal from "../../hooks/useGlobal"
import useApi from "../../hooks/useApi"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

const Onboarding = () => {
  const { data: companies, loading, refresh } = useApi<CompanyType[]>(getCompanies)
  const [ selectedAvatar, setSelectedAvatar ] = useState<string | null>(null)
  const [ selectedCompany, setSelectedCompany ] = useState<string | null>(null)
  const user = useGlobal(user$)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (user?.company) return navigate("/dashboard")
  }, [])

  const saveUserData = async () => {
    if (!selectedAvatar || !selectedCompany) return toast.error("Choose your avatar and company first!")
    await update({ avatar: selectedAvatar, company: selectedCompany })
    navigate("/dashboard")
  }

  if (loading) return <Loader />

  return (
    <div className="onboarding wrapper">
      <h1>{t("onboarding.welcome")} {user?.name.split(" ")[0]}</h1>
      <p className="title">{t("onboarding.avatar")}</p>
      <section className="avatars">
        { avatars.map(image => <Avatar key={image} image={image} onClick={() => setSelectedAvatar(getFilename(image))} selected={image.includes(selectedAvatar!)} />)}
      </section>
      <p className="title">{t("onboarding.company")}</p>
      <ul className="companies">
        { companies && companies.map(company => <CompanyTag key={company._id} company={company} onClick={() => setSelectedCompany(company._id)} selected={selectedCompany === company._id} />)}
      </ul>
      <AddCompany refresh={refresh} />
      <button className="solid" onClick={saveUserData} >
        {t("onboarding.next-button")} <ArrowRight />
      </button>
    </div>
  )
}

export default Onboarding