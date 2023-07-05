import { useState, useEffect } from "react";
import useDrone from "./functionDrone.js";
import useRoom from "./functionRoom.js";
import Messages from "./Messages";
import Input from "./Input";

export default function App() {
  const [messages, setMessages] = useState([]);
  // hook za inicijaliziranje i upravljanje drone konekcijom
  const { member, drone } = useDrone();
  // hook za urpavljanje chat room-om i members-ima
  const { members, message } = useRoom(drone);

  useEffect(() => {
    // updejt message array-a nakon nove poruke
    if (message) {
      setMessages((prev) => [...prev, message]);
    }
  }, [message]);

  const handleSendMessage = (message) => {
    // kreira message object s current member & text
    const poruka = { member: member, text: message };
    // objavljuje poruku u chat room koristeći drone
    drone.publish({
      room: "observable-chatApp", // ime koje stoji u Scaledron-u u rubrici za room name
      message: poruka, // dobivanje ikonice (randomColor) i imena (randomName) skupa s porukom
    });
  };

  return (
    <div className="container">
      <div className="app">
        <div className="header">KPortfolio CHATAPP</div>
        <Messages messages={messages} currentMember={member} />
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
