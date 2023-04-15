import { FC } from "react"
import { HiBadgeCheck } from "react-icons/hi"

type Props = {
  image: string,
  onClick?: React.MouseEventHandler<HTMLImageElement>,
  selected?: boolean
}

const Avatar: FC<Props> = ({ image, onClick, selected }) => {
  return (
    <div className="avatar">
      <div className="box">
        <img src={image} onClick={onClick} />
      </div>
      { selected && <HiBadgeCheck /> }
    </div>
  )
}

export default Avatar