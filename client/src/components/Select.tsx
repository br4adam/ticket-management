import { useState, useRef } from "react"
import { ChevronUp, ChevronDown } from "@carbon/icons-react"
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
  options: string[]
  def: string
  onSelect?: (value: string) => void
  disabled?: boolean
}

const Select = ({ options, def, disabled, onSelect = () => {} }: Props) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ selected, setSelected ] = useState<string>(def || options[0])

  const icons = [ open, pending, closed, low, medium, high ]
  const icon = icons.find(item => item.includes(selected))

  const toggling = () => setIsOpen(prev => !prev)
  const close = () => setIsOpen(false)

  const optionsRef = useRef<HTMLDivElement>(null)
  useClickOutside(optionsRef, close)

  const onChange = (value: string) => {
    setSelected(value)
    onSelect(value)
    setIsOpen(false)
  }
  
  return (
    <div className="select container" ref={optionsRef}>
      <div className="header" onClick={toggling}>
        <div className={`icon ${selected}`}>
          <img src={icon} alt="option icon" />
        </div>
        <p>{ capitalize(selected) }</p>
        { !disabled &&
          <div className="chevron" >
          { isOpen ? <ChevronUp size="20" /> : <ChevronDown size="20" /> } 
          </div>
        }
      </div>
      { isOpen && !disabled && 
        <ul className="options">
          { options.map(option => <SelectOption key={option} option={option} onChange={onChange} />) }
        </ul>
      }
    </div>
  )
}

export default Select