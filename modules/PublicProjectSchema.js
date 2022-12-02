const mongoose = require("mongoose");
const Rout = require("../Routers/Addproject");

const publicProjects = mongoose.Schema(
  {
    Avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    Photo: {
      type: String,
    },
    Description: {
      type: String,
    },
    Stack: {
      type: String,
    },
    titel: {
      type: String,
    },
    Projectlink: {
      type: String,
    },
    Github: {
      type: String,
    },
    Link: {
      type: String,
    },
    Mob: {
      type: String,
    },
    userdata: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("publicProjects", publicProjects);
