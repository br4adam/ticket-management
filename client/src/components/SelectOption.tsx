import open from "../assets/status-open.svg"
import pending from "../assets/status-pending.svg"
import closed from "../assets/status-closed.svg"
import low from "../assets/priority-low.svg"
import medium from "../assets/priority-medium.svg"
import high from "../assets/priority-high.svg"
import capitalize from "../utils/capitalize"

type Props = {
  option: string
  onChange: (value: string) => void
}

const SelectOption = ({ option, onChange }: Props) => {
  const icons = [ open, pending, closed, low, medium, high ]
  const icon = icons.find(item => item.includes(option))

  return (
    <li onClick={() => onChange(option)} className="option">
      <div className={`icon ${option}`}>
        <img src={icon} alt="option icon" />
      </div>
      <p>{ capitalize(option) }</p>
    </li>
  )
}

export default SelectOption