const mongoose = require("mongoose");

const project = mongoose.Schema({
  email: {
    type: String,
  },
  Avatar: {
    type: String,
  },
  projectDetails: [{}],
});

module.exports = new mongoose.model("project", project);
// userProfile: {
//   type: {},
// },
// projectTilet: {
//   type: String,
// },
// Startdate: {
//   type: String,
// },
// Endtdate: {
//   type: String,
// },
// githubLink: {
//   type: String,
// },
// projectLink: {
//   type: String,
// },
// Like: {
//   type: String,
// },
// Stack: {
//   type: String,
// },
// Detail: {
//   type: String,
// },
// photo: {
//   type: String,
// },
// acces: {
//   type: String,
//   default: "privet",
// },
