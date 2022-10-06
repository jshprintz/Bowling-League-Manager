const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: String,
    email: String,
    avg: Number,
    leagues: Array,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
