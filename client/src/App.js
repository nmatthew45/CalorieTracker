import "./App.css";
import { useEffect, useState } from "react";
const Axios = require("axios");

function App() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [listOfFriends, setListOfFriends] = useState([]);

  // CREATE
  const addFriend = () => {
    Axios.post("https://friendslist-mnguyen.herokuapp.com//addfriend", {
      name: name,
      note: note,
    }).then((response) =>
      setListOfFriends([
        ...listOfFriends,
        { _id: response.data._id, name: name, note: note },
      ])
    );
  };

  // READ
  useEffect(() => {
    Axios.get("https://friendslist-mnguyen.herokuapp.com//viewfriends")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  // UPDATE
  const updateFriend = (id) => {
    const newNote = prompt("Enter new note: ");
    Axios.put("https://friendslist-mnguyen.herokuapp.com//update", {
      newNote: newNote,
      id: id,
    }).then(() => {
      setListOfFriends(
        listOfFriends.map((val) => {
          return val._id === id
            ? { _id: id, name: val.name, note: newNote }
            : val;
        })
      );
    });
  };

  // DELETE
  const deleteFriend = (id) => {
    Axios.delete(`https://friendslist-mnguyen.herokuapp.com//delete/${id}`).then(() => {
      setListOfFriends(
        listOfFriends.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="inputs">
        <h1 className="titleHeader">Friends List</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Note"
          onChange={(event) => setNote(event.target.value)}
        ></input>
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Note: {val.note}</h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Update
              </button>
              <button
                id="removeBtn"
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
