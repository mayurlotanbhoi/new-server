const userData = require("../modules/userScheama");
const ProjectSchema = require("../modules/ProjectSheama");
const multer = require("multer");
const bcrypt = require("bcrypt");
const Rout = require("express").Router();
const path = require("path");
const fs = require("fs");

// projectPhotos

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Avatar");
  },
  filename: (req, file, cb) => {
    let uniqueFileName =
      file.originalname + Date.now() + path.extname(file.originalname);

    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, uniqueFileName);
    } else {
      cb(null, false);

      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const upload = multer({ storage: storage });

// *************for incode filr in base64
// function base64_encode(file) {
//   return "data:image/png;base64," + fs.readFileSync(file, "base64");
// }

Rout.post("/register", upload.single("myfile"), async (req, res) => {
  try {
    const useInfo = req.body;

    // useInfo.Avatar = req.file.path;
    // console.log("ok");
    // useInfo.Avatar = base64_encode(`./${req.file.path}`);
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

    const conpressingImageBuf = await require("sharp")(req.file.path)
      .resize(400)
      .webp({ quality: 80 })
      .toBuffer();
    useInfo.Avatar = `data:image/png;base64,${conpressingImageBuf.toString(
      "base64"
    )}`;

    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.log(error);
      }
    });

    useInfo.password = await bcrypt.hash(useInfo.password, 6);

    // console.log(useInfo.password);

    const data = await userData.create(useInfo);

    const project = await ProjectSchema.create({
      email: useInfo.email,
      Avatar: useInfo.Avatar,
    });

    // console.log(data);

    res.status(201).json({ massege: "Registation Succesful" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = Rout;
