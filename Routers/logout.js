const Rout = require("express").Router();

Rout.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");

  res.status(200).json({ massege: "logout" });
});

module.exports = Rout;
