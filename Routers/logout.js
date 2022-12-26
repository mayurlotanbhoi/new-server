const Rout = require("express").Router();

Rout.get("/logout", (req, res) => {


   res
    .status(200)
    .cookie("jwtoken", jsonwebtoken, {
      httpOnly: true,
      expiresIn: Date.now(),
      sameSite: "none",
      secure: true,
    }).json({ massege: "logout" });

  
});

module.exports = Rout;
