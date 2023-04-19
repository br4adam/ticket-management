import { FC } from "react"
import avatars from "../../assets/avatars"
import defaultAvatar from "../../assets/default-avatar.webp"
import Avatar from "../../components/Avatar"
import timeAgo from "../../utils/timeAgo"

type Props = {
  message: {
    message: string
    date: string
    user: {
        _id: string
        name: string
        avatar?: string
    }
  }
}

const Message: FC<Props> = ({ message }) => {
  const avatar = avatars.find(a => a.includes(message.user.avatar!)) || defaultAvatar

  return (
    <div className="message">
      <Avatar image={avatar} />
      <div>
        <p className="from">{ message.user.name }<span>{ " • " + timeAgo(message.date) }</span></p>
        <p className="text">{ message.message }</p>
      </div>
    </div>
  )
}

export default Message