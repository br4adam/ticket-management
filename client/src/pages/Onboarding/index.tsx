import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HiArrowRight } from "react-icons/hi"
import avatars from "../../assets/avatars"
import Avatar from "../../components/Avatar"
import CompanyTag from "./CompanyTag"
import AddCompany from "./AddCompany"
import { getCompanies } from "../../api/companies"
import { user$, update as updateUser } from "../../states/user"
import useGlobal from "../../hooks/useGlobal"

export type Company = {
  _id: string,
  name: string,
  admins: string[]
}

const Onboarding = () => {
  const [ companies, setCompanies ] = useState<Company[]>([])
  const [ selectedAvatar, setSelectedAvatar ] = useState<string | null>(null)
  const [ selectedCompany, setSelectedCompany ] = useState<string | null>(null)
  const user = useGlobal(user$)
  const navigate = useNavigate()

  const getCompaniesList = async () => {
    const companies = await getCompanies()
    if (!companies) return
    setCompanies(companies)
  }

  useEffect(() => {
    getCompaniesList()
  }, [])

  useEffect(() => {
    if (user && user.company && user.avatar) navigate("/dashboard")
  }, [user])
  
  const onClick = (imagePath: string) => {
    const pathArray = imagePath.split("/")
    const fileName = pathArray[pathArray.length - 1].split(".")
    const avatarName = fileName[0]
    setSelectedAvatar(avatarName)
  }

  const saveData = async () => {
    if (!selectedAvatar || !selectedCompany) return
    console.log(selectedAvatar, selectedCompany)
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/me`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ avatar: selectedAvatar, company: selectedCompany })
    })
    const data = await response.json()
    updateUser(data)
    if (!response.ok) return
    navigate("/dashboard")
  }

  return (
    <div className="onboarding wrapper">
      <p>Set an avatar for yourself!</p>
      <section className="avatars">
        { avatars.map(image => <Avatar key={image} image={image} onClick={() => onClick(image)} selected={image.includes(selectedAvatar!)} />)}
      </section>
      <p>Choose your company from the list</p>
      <ul className="companies">
        { companies && companies.map(company => <CompanyTag key={company._id} company={company} onClick={() => setSelectedCompany(company._id)} selected={selectedCompany === company._id} />)}
      </ul>
      <p>or</p>
      <AddCompany />
      <button className="solid" onClick={saveData} disabled={!selectedAvatar || !selectedCompany}>
        Continue <HiArrowRight/>
      </button>
    </div>
  )
}

export default Onboarding