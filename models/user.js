const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoooe = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoooe);

module.exports = mongoose.model("User", userSchema);
