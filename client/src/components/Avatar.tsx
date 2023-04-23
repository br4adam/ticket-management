import { FC } from "react"
import { CheckmarkFilled } from "@carbon/icons-react"
import avatars from "../assets/avatars"
import defaultAvatar from "../assets/default-avatar.webp"

type Props = {
  image: string,
  onClick?: React.MouseEventHandler<HTMLImageElement>,
  selected?: boolean
}

const Avatar: FC<Props> = ({ image, onClick, selected }) => {
  const avatar = avatars.find(a => a.includes(image)) || defaultAvatar

  return (
    <div className="avatar">
      <div className="box">
        <img src={avatar} onClick={onClick} />
      </div>
      { selected && <CheckmarkFilled size="20" /> }
    </div>
  )
}

export default Avatar