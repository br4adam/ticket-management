import { FC, useState } from "react"
import { useParams } from "react-router-dom"
import { HiPaperAirplane } from "react-icons/hi"
import useGlobal from "../../hooks/useGlobal"
import { user$ } from "../../states/user"
import { sendMessage } from "../../api/tickets"

type Props = {
  refresh: () => Promise<void>
}

const MessageInput: FC<Props> = ({ refresh }) => {
  const [ message, setMessage ] = useState<string>("")
  const { id } = useParams()
  const user = useGlobal(user$)

  const sendNewMessage = async () => {
    if (!id || !user || message.length < 1) return
    await sendMessage(id, { user: user._id, message })
    setMessage("")
    refresh()
  }

  return (
    <div className="new-message">
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} name="message" placeholder="Type your message here..." />
      <button className="solid" onClick={sendNewMessage}>Send <HiPaperAirplane /></button>
    </div>
  )
}

export default MessageInput