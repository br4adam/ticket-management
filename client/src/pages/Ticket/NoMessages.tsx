import nomessages from "../../assets/no-messages.webp"

const NoMessages = () => {
  return (
    <div className="no-messages">
      <p>No messages yet</p>
      <p>Get or send a message and it will show up here.</p>
      <img src={nomessages} alt="no messages" />
    </div>
  )
}

export default NoMessages