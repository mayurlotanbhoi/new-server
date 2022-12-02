const mongoose = require("mongoose");

const userDetails = mongoose.Schema({
  name: {
    type: String,
    require,
  },
  Mob: {
    type: String,
    require,
  },
  email: {
    type: String,
    unique: true,
    require,
  },
  password: {
    type: String,
    require,
  },
  experiance: {
    type: Number,
    require,
  },

  Avatar: {
    type: String,
    require,
  },
  feild: {
    type: String,
    require,
  },
  education: {
    type: String,
    require,
  },
  Stack: {
    type: String,
    require,
  },

  Comp: {
    type: String,
    require,
  },
  About: {
    type: String,
    require,
  },
  Post: {
    type: String,
    require,
  },
});

module.exports = new mongoose.model("userDetails", userDetails);
