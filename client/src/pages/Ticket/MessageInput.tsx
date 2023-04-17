import { useState } from "react"
import { HiPaperAirplane } from "react-icons/hi"

const MessageInput = () => {
  const [ newMessage, setNewMessage ] = useState<string>("")

  return (
    <div className="new-message">
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} name="message" placeholder="Type your message here..." />
      <button className="solid">Send <HiPaperAirplane /></button>
    </div>
  )
}

export default MessageInput