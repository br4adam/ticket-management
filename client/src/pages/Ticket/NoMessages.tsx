import nomessages from "../../assets/no-messages.webp"

const NoMessages = () => {
  return (
    <div className="no-messages">
      <h3>No messages yet</h3>
      <p>Get or send a message and it will show up here.</p>
      <img src={nomessages} alt="no messages" />
    </div>
  )
}

export default NoMessages