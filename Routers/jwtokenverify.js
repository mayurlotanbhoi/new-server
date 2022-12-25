const jwt = require("jsonwebtoken");

async function jwtVerify(req, res, next) {
  // const userEmai = req.body.email;

  try {
    // const token = req.cookies.jwtoken;

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heXVybG90YW4yMDBAZ21haWwuY29tIiwiaWF0IjoxNjcxOTUxNzY2LCJleHAiOjE2NzQ1NDM3NjZ9.wD2KiCyXshyKCYz14TkD3R5RehmkjsHZZQNhTOJRFHk"

    // console.log(token);

    if (!token)
    res.status(401).json({ message: "Authentication failed" });
     return
     ;

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
