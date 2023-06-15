const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("users", schema);
module.exports = User;
