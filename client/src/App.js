import "./App.css";
import { useState } from "react";
const Axios = require("axios");

function App() {
  const [name, setName] = useState("");

  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      name: name,
    });
  };

  return (
    <div>
      <div className="inputs">
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <button onClick={addFriend}>Add Friend</button>
      </div>
    </div>
  );
}

export default App;
