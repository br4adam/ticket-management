import { CheckmarkFilled } from "@carbon/icons-react"
import type { CompanyType } from "../../api/companies"
import { FC } from "react"

type Props = {
  company: CompanyType,
  onClick: React.MouseEventHandler<HTMLLIElement>,
  selected: boolean,
}

const CompanyTag: FC<Props> = ({ company, onClick, selected }) => {
  return (
    <li onClick={onClick}>
      { company.name }
      { selected && <CheckmarkFilled size="20" /> }
    </li>
  )
}

export default CompanyTag