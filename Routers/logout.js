const Rout = require("express").Router();

Rout.get("/logout", (req, res) => {
  res
    .status(200)
    .cookie("jwtoken", "nodata", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({ massege: "logout" });
});

module.exports = Rout;
