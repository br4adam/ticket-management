import { useState } from "react"

const AddCompany = () => {
  const [ newCompany, setNewCompany ] = useState<string>("")

  const saveCompany = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ name: newCompany })
      })
      const data = await response.json()
      setNewCompany("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="add-company">
      <input type="text" placeholder="add your company" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
      <button className="solid" disabled={!newCompany} onClick={saveCompany}>Add</button>
    </div>
  )
}

export default AddCompany