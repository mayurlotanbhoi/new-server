const { json } = require("express");
const userData = require("../modules/userScheama");
const ProjectSchema = require("../modules/ProjectSheama");
const multer = require("multer");
const bcrypt = require("bcrypt");
const Rout = require("express").Router();
const path = require("path");

// projectPhotos

const storage = multer.diskStorage({

  destination: (req, file, cd) => {
    cd(null, "./public/Avatar");
  },
  filename: (req, file, cd) => {
    let uniqueFileName =
      file.originalname + Date.now() + path.extname(file.originalname);

    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cd(null, uniqueFileName);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const upload = multer({ storage: storage });

Rout.post("/register", upload.single("myfile"), async (req, res) => {
  try {
    const useInfo = req.body;

    useInfo.Avatar = req.file.path;

    // console.log(useInfo);

    if (!useInfo.email || !useInfo.password) {
      res.send({ masseg: "please provide all information" });

      return;
    }

    const UserAlreadyPresent = await userData.findOne({ email: useInfo.email });

    if (UserAlreadyPresent) {
      res.status(203).json({ massege: "User Alredy Present" });
      return;
    }

    // console.log(useInfo.Password);

    useInfo.password = await bcrypt.hash(useInfo.password, 6);
    

    console.log(useInfo.password);

    const data = await userData.create(useInfo);
    const project = await ProjectSchema.create({
      email: useInfo.email,
      Avatar: useInfo.Avatar,
    });
    console.log(data);

    res.status(201).json({ massege: "Registation Succesful" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = Rout;
