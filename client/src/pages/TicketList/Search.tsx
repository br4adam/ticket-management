import { useState } from "react"
import { toast } from "react-hot-toast"
import { HiOutlineSearch } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [ searchValue, setSearchValue ] = useState<string>("")
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onClick = () => {
    if (!searchValue) toast.error("Please type the Id of the ticket first!")
    navigate(`/tickets/${searchValue}`)
  }

  return (
    <div className="search">
    <input value={searchValue} onChange={onChange} type="text" name="search" placeholder="Search by Id" />
    <button className="solid" onClick={onClick}><HiOutlineSearch /></button>
  </div>
  )
}

export default Search