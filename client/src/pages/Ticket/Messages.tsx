import { FC } from "react"
import Message from "./Message"
import MessageInput from "./MessageInput"
import NoMessages from "./NoMessages"
import { useTranslation } from "react-i18next"

type Props = {
  messages: {
    message: string
    date: string
    user: {
        _id: string
        name: string
        avatar?: string
    }
  }[]
  refresh: () => Promise<void>
}

const Messages: FC<Props> = ({ messages, refresh }) => {
  const { t } = useTranslation()

  return (
    <section className="messages container">
      <h2>{t("ticket.messages-title")} { !!messages.length && <span>({ messages.length })</span> }</h2>
      { messages.length > 0
        ? <>{ messages.map((message, index) => <Message key={index} message={message} /> )}</>
        : <NoMessages />
      }
      <MessageInput refresh={refresh} />
    </section>
  )
}

export default Messages