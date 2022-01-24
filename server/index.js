const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FriendModel = require("./models/Friends");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://mern:mongodb@cluster0.ttonn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

// CREATE
app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const note = req.body.note;
  const friend = new FriendModel({ name: name, note: note });
  await friend.save();
  res.send(friend);
});

// READ
app.get("/viewfriends", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// UPDATE
app.put("/update", async (req, res) => {
  const newNote = req.body.newNote;
  const id = req.body.id;
  try {
    await FriendModel.findById(id, (error, friendToUpdate) => {
      friendToUpdate.note = newNote;
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

// DELETE

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FriendModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});

// Start Server
app.listen(3001, () => {
  console.log("Successfully started on port 3001");
});
