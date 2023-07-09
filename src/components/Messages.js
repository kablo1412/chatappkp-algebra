import "./styles/messages.css";

export default function Messages({ messages, currentMember }) {
  // renderiranje jedne odnosno zasebne poruke
  const renderMessage = (message) => {
    const { member, text } = message.data;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ? "message currentMember" : "message";
    const timestamp = new Date(message.timestamp).toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    return (
      <li className={className} key={message.id}>
        <img
          className="avatar"
          src={member.color}
          alt={`${member.name}'s Avatar`}
        />
        <div className="message-content">
          <div className="username">
            {member.name} at {timestamp}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };
  //renderiranje liste poruka :
  const messageList =
    // provjera ima li poruka & sadržaja za prikazivanje
    messages && messages.length > 0 ? (
      // ako ima poruka, mapiraj kroz svaku od njih te ju renderiraj koristeći funkciju renderMessage
      messages.map((msg) => renderMessage(msg))
    ) : (
      // a ako nema poruka, renderiraj list item s porukom "No messages yet + emoji."
      <li style={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center" }}>
        No messages yet. 😏
      </li>
    );

  return <ul className="messages">{messageList}</ul>;
}
