import { useEffect, useState } from "react";

export default function useRoom(drone) {
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    // povezivanje s  "observable-chatApp" sobom koristeći drone instancu
    const room = drone.subscribe("observable-chatApp");
    // ažuriranje members state-a nakon primitka "memens" event-a
    const handleMembers = (members) => {
      setMembers(members);
    };
    // ažuriranje poruka nakon primitka "message" event-a
    const handleMessage = (message) => {
      setMessage(message);
    };

    // dohvaćanje evenata za members i message evente
    // prvi parametar je naziv događaja, a drugi parametar je povratna funkcija koja će se izvršiti kada se taj događaj aktivira.
    room.on("members", handleMembers);
    room.on("message", handleMessage);

    // kontra od onoga što se dešava na linijama koda pod brojem 21 i 22
    return () => {
      room.off("members", handleMembers);
      room.off("message", handleMessage);
    };
  }, [drone]);

  return { members, message };
}
