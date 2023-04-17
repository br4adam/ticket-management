import { FC, useState } from "react"
import { createCompany } from "../../api/companies"

type Props = {
  getCompaniesList: () => Promise<void>
}

const AddCompany: FC<Props> = ({ getCompaniesList }) => {
  const [ newCompany, setNewCompany ] = useState<string>("")

  const saveCompany = async () => {
    if (!newCompany) return
    await createCompany(newCompany)
    await getCompaniesList()
    setNewCompany("")
  }

  return (
    <div className="add-company">
      <input type="text" placeholder="add your company" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
      <button className="solid" disabled={!newCompany} onClick={saveCompany}>Add</button>
    </div>
  )
}

export default AddCompany