import { FC } from "react"
import Message from "./Message"
import MessageInput from "./MessageInput"
import NoMessages from "./NoMessages"

type Props = {
  messages: {
    message: string
    date: string
    user: {
        _id: string
        name: string
        avatar: string
    }
  }[],
  reloadTicket: () => Promise<any>
}

const Messages: FC<Props> = ({ messages, reloadTicket }) => {
  const hasMessages = !!messages.length

  return (
    <section className="messages container">
      <p className="title">Messages { hasMessages && <span>({ messages.length })</span> }</p>
      { messages.length > 0
        ? <>{ messages.map((message, index) => <Message key={index} message={message} /> )}</>
        : <NoMessages />
      }
      <MessageInput reloadTicket={reloadTicket} />
    </section>
  )
}

export default Messages