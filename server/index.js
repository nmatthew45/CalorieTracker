const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FriendModel = require("./models/Friends");
const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(
  "mongodb+srv://mern:mongodb@cluster0.ttonn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.post("/addfriend", async (req, res) => {
    const name = req.body.name
    const friend = new FriendModel({name: name})
    await friend.save()
    console.log("Success")
})

app.listen(3001, () => {
  console.log("Successfully started on port 3001");
});
