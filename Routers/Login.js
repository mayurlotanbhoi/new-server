const mongoose = require("mongoose");
const userdatas = require("../modules/userScheama");
const Rout = require("express").Router();
const cookie = require("cookie");
// const TOKEN_VERIFY = require("./JWTverification");
const jwt = require("jsonwebtoken");
const bcypt = require("bcrypt");

Rout.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);

    if (!email || !password) {
      res.status(401).json({ massege: "please provide all info" });
      return;
    }

    const info = await userdatas.findOne({ email });

    if (!info) {
      res.status(401).json({ massege: "wrong credentioal" });
      return;
    }

    const PassIsMatch = await bcypt.compare(password, info.password);
    // console.log(PassIsMatch);

    if (!PassIsMatch) {
      res.status(401).json({ massege: "wrong credentioal" });
      return;
    }

    const jsonwebtoken = jwt.sign({ email: email }, process.env.SECREATE_KEY, {
      expiresIn: "30d",
    });

    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwtoken", jsonwebtoken, {
          maxAge: 3600, // 1 hour in seconds
          httpOnly: true,
          sameSite: "lax", // optional
          path: "/", // optional
        })
      )
      .json({ massege: "Login SuccesFull" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = Rout;
