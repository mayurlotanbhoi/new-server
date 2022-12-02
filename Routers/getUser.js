const Rout = require("express").Router();

const userScheama = require("../modules/userScheama");
const jwtVerify = require("./jwtokenverify");

Rout.get("/", jwtVerify, async (req, res) => {
  try {
    const email = req.email;

    // console.log(email);

    const userdata = await userScheama.findOne({ email });

    const { password, ...all } = userdata._doc;

    // console.log(all);

    res.status(200).json(all);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
