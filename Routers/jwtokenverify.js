const jwt = require("jsonwebtoken");

async function jwtVerify(req, res, next) {
  // const userEmai = req.body.email;

  try {
    const token = req.cookies.jwtoken;

    // console.log(token);

    if (!token) return;

    const user = jwt.verify(token, process.env.SECREATE_KEY);

    if (!user.email) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    req.email = user.email;

    next();

    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ masseg: "Authonticaton error" });

    return;
  }
}

module.exports = jwtVerify;
