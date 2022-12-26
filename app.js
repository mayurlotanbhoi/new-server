const express = require("express");
const cookiParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;
const DB = process.env.DB;

app.use(cookiParser());

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DATA BASE CONNECTION SUCCESFUL");
  })
  .catch((error) => {
    console.log(error);
  });



app.use(
  cors({
    origin: ["https://mern-projectgallery-api.onrender.com/","https://mern-project-gallery-app.onrender.com","http://localhost:3000"],
    credentials: true,
    methods: ['GET', 'PUT', 'POST','DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
  credentials: true, 
  expiresIn: "30d", 
  exposedHeaders: ['*', 'Authorization' ] 
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.json());

app.use("/public", express.static("public"));

const Register = require("./Routers/Registation");
const Login = require("./Routers/Login");
const LogOut = require("./Routers/logout");
const AddProject = require("./Routers/Addproject");
const getuser = require("./Routers/getUser");
const MyProject = require("./Routers/Myproject");
const PublicProjectPost = require("./Routers/PublicProject");
const GetPublicProject = require("./Routers/GetPublicProject");
const SerchePublicProject = require("./Routers/SechPublicProject");

app.use("/user", GetPublicProject);
app.use("/user", PublicProjectPost);
app.use("/",getuser);
app.use("/user", Register);
app.use("/user", Login);
app.use("/user", AddProject);
app.use("/user", LogOut);
app.use("/user", MyProject);
app.use("/user", SerchePublicProject);

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("clent/build"));
// }

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
