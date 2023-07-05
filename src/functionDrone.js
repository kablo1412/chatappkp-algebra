import { useCallback, useEffect, useMemo, useState } from "react";
import { randomName } from "./randomizirajuce/randomName";
import { randomColor } from "./randomizirajuce/randomColor";
// ubacivanje retka ispod kroz npm naredbu iz razloga ne-reagiranja na moju api moje sobe.
import Scaledrone from "scaledrone-react-native";

export default function useDrone() {
  // stanje člana sobe
  const [member, setMember] = useState({
    name: randomName(), // generiranje nasumičnog imena loristeći dvije riječi iz randomName komponente
    color: randomColor(), // isto kao komentar iznad, samo za boju.
  });
  const [connected, setConnected] = useState(false); // stanje povezanosti
  const [isOpened, setIsOpened] = useState(false); // stanje otvorenosti veze
  const [error, setError] = useState(null); // stanje greške

  // kreira instancu scaledrone objekta korištenjem useMemo kako bi se izbjeglo nepotrebno ponovno stvaranje objekta pri promjeni stanja člana
  const drone = useMemo(() => {
    const room = new Scaledrone("aWPR2jOy12BtArSi", {
      data: member,
    });
    return room;
  }, [member]);

  const onOpen = useCallback(() => {
    member.id = drone.clientId; // postavlja ID člana na ID generiran od strane scaledrone-a
    setIsOpened(true); // postavlja stanje otvorenosti veze na true
    setConnected(true); // postavlja stanje povezanosti na true
  }, []);

  //funkcija pozvana pri zatvaranju veze
  const onClose = useCallback(() => {
    setConnected(false);
  }, []);

  // funkcija pozvana pri grešci veze
  const onError = useCallback((error) => {
    setError(error);
  }, []);

  // efekt koji će se dogoditi ovisno o konekciji, grešci browsera itd...
  useEffect(() => {
    drone.on("open", onOpen);
    drone.on("close", onClose);
    drone.on("error", onError);
  }, [drone, onOpen, onClose, onError]);

  // povrat vrijednosti koje će biti dostupne iz custom hook-a
  return { isOpened, member, drone, connected, error };
}
