const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const FriendModel = mongoose.model("friends", FriendSchema);

module.exports = FriendModel;
