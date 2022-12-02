const Rout = require("express").Router();

const MyProjectDb = require("../modules/ProjectSheama");
const jwtVerify = require("./jwtokenverify");

Rout.get("/mayProject", jwtVerify, async (req, res) => {
  try {
    const email = req.email;

    const project = await MyProjectDb.findOne({ email });

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
