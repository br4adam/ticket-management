import { FC, useState } from "react"
import { useParams } from "react-router-dom"
import { SendFilled } from "@carbon/icons-react"
import useGlobal from "../../hooks/useGlobal"
import { user$ } from "../../states/user"
import { sendMessage } from "../../api/tickets"
import { toast } from "react-hot-toast"

type Props = {
  refresh: () => Promise<void>
}

const MessageInput: FC<Props> = ({ refresh }) => {
  const [ message, setMessage ] = useState<string>("")
  const { id } = useParams()
  const user = useGlobal(user$)

  const sendNewMessage = async () => {
    if (!id || !user || message.length < 1) return toast.error("Write your message before sending!")
    const response = await sendMessage(id, { user: user._id, message })
    if (!response.success) return toast.error("Unable to send your message!")
    setMessage("")
    refresh()
  }

  return (
    <div className="new-message">
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} name="message" placeholder="Write your message here." />
      <button className="solid" onClick={sendNewMessage}>Send <SendFilled /></button>
    </div>
  )
}

export default MessageInput