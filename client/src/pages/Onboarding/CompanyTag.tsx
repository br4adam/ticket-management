import { HiBadgeCheck } from "react-icons/hi"
import type { Company } from "."
import { FC } from "react"

type Props = {
  company: Company,
  onClick: React.MouseEventHandler<HTMLLIElement>,
  selected: boolean,
}

const CompanyTag: FC<Props> = ({ company, onClick, selected }) => {
  return (
    <li onClick={onClick}>
      { company.name }
      { selected && <HiBadgeCheck /> }
    </li>
  )
}

export default CompanyTag