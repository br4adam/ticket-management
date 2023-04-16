import { FC, useState, useRef } from "react"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import useClickOutside from "../hooks/useClickOutside"
import SelectOption from "./SelectOption"
import capitalize from "../utils/capitalize"
import open from "../assets/status-open.svg"
import pending from "../assets/status-pending.svg"
import closed from "../assets/status-closed.svg"
import low from "../assets/priority-low.svg"
import medium from "../assets/priority-medium.svg"
import high from "../assets/priority-high.svg"

type Props = {
  options: string[],
  onSelect?: React.Dispatch<React.SetStateAction<string>>
  disabled?: boolean
}

const Select: FC<Props> = ({ options, disabled, onSelect = () => {} }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ selected, setSelected ] = useState<string>(options[0])

  const icons = [ open, pending, closed, low, medium, high ]
  const icon = icons.find(item => item.includes(selected))

  const toggling = () => setIsOpen(prev => !prev)
  const close = () => setIsOpen(false)

  const optionsRef = useRef(null)
  useClickOutside(optionsRef, close)

  const onChange = (value: string) => {
    setSelected(value)
    onSelect(selected)
    setIsOpen(false)
  }
  
  return (
    <div className="select container">
      <div className="header">
        <div className={`icon ${selected}`}>
          <img src={icon} alt="option icon" />
        </div>
        <p>{ capitalize(selected) }</p>
        { !disabled &&
          <div className="chevron" onClick={toggling}>
          { isOpen ? <HiChevronUp /> : <HiChevronDown /> } 
          </div>
        }
      </div>
      { isOpen && !disabled && 
        <ul className="options" ref={optionsRef}>
          { options.map(option => <SelectOption key={option} option={option} onChange={onChange} />) }
        </ul>
      }
    </div>
  )
}

export default Select