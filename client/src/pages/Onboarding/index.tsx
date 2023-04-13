import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HiArrowRight } from "react-icons/hi"
import avatars from "../../assets/avatars"
import Avatar from "../../components/Avatar"
import CompanyTag from "./CompanyTag"
import AddCompany from "./AddCompany"
import { getCompanies, type CompanyType } from "../../api/companies"
import getFilename from "../../utils/getFilename"
import { update as updateUser } from "../../states/user"

const Onboarding = () => {
  const [ companies, setCompanies ] = useState<CompanyType[]>([])
  const [ selectedAvatar, setSelectedAvatar ] = useState<string | null>(null)
  const [ selectedCompany, setSelectedCompany ] = useState<string | null>(null)
  const navigate = useNavigate()

  const getCompaniesList = async () => {
    const companies = await getCompanies()
    if (companies) setCompanies(companies)
  }

  useEffect(() => {
    getCompaniesList()
  }, [])

  const saveUserData = async () => {
    if (!selectedAvatar || !selectedCompany) return
    await updateUser({ avatar: selectedAvatar, company: selectedCompany })
    navigate("/dashboard")
  }

  return (
    <div className="onboarding wrapper">
      <p>Set an avatar for yourself!</p>
      <section className="avatars">
        { avatars.map(image => <Avatar key={image} image={image} onClick={() => setSelectedAvatar(getFilename(image))} selected={image.includes(selectedAvatar!)} />)}
      </section>
      <p>Choose your company from the list</p>
      <ul className="companies">
        { companies && companies.map(company => <CompanyTag key={company._id} company={company} onClick={() => setSelectedCompany(company._id)} selected={selectedCompany === company._id} />)}
      </ul>
      <p>or</p>
      <AddCompany getCompaniesList={getCompaniesList} />
      <button className="solid" onClick={saveUserData} disabled={!selectedAvatar || !selectedCompany}>
        Continue <HiArrowRight/>
      </button>
    </div>
  )
}

export default Onboarding