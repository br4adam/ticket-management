import { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [ searchValue, setSearchValue ] = useState<string>("")
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="search">
    <input value={searchValue} onChange={onChange} type="text" name="search" placeholder="Search by Id" />
    <button className="solid" onClick={() => navigate(`/tickets/${searchValue}`)}><HiOutlineSearch /></button>
  </div>
  )
}

export default Search