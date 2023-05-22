import { useState } from "react"
import { toast } from "react-hot-toast"
import { Search as SearchIcon } from "@carbon/icons-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Search = () => {
  const [ searchValue, setSearchValue ] = useState<string>("")
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onClick = () => {
    if (!searchValue) toast.error("Please type the Id of the ticket first!")
    navigate(`/tickets/${searchValue}`)
  }

  return (
    <div className="search">
    <input value={searchValue} onChange={onChange} type="text" name="search" placeholder={t("ticketlist.placeholder")} />
    <button className="solid" onClick={onClick} aria-label="Search"><SearchIcon /></button>
  </div>
  )
}

export default Search