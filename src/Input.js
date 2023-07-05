import { useState } from "react";

export default function Input(dogadaj) {
  const [inputValue, setInputValue] = useState("");

  // mjenjanje input elementa na promjene ( ...na tipkanje )
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // promjene nakon pritiska gumba "SEND", odnosno slanje utipkanog na polje za razgovor
  const handleSubmit = (e) => {
    // preventiva page reload-a nakon klika na button
    e.preventDefault();
    setInputValue("");
    // invoke funkcije od parent komponente
    dogadaj.onSendMessage(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button>Send</button>
    </form>
  );
}
