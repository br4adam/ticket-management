import { FC } from "react"
import Message from "./Message"
import MessageInput from "./MessageInput"

type Props = {
  messages: {
    message: string
    date: string
    user: {
        _id: string
        name: string
        avatar: string
    }
  }[]
}

const Messages: FC<Props> = ({ messages }) => {
  const hasMessages = !!messages.length

  return (
    <section className="messages container">
      <p className="title">Messages { hasMessages && <span>({ messages.length })</span> }</p>
      { messages.map((message, index) => <Message key={index} message={message} /> )}
      <MessageInput />
    </section>
  )
}

export default Messages