const userData = require("../modules/userScheama");
const ProjectSchema = require("../modules/ProjectSheama");
const PublicSchema = require("../modules/PublicProjectSchema");
const multer = require("multer");
const bcrypt = require("bcrypt");
const Rout = require("express").Router();
const path = require("path");
const fs = require("fs");
// const sharp = require("sharp");
// const file = require("../public/compressimage/image.webp")

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

// function base64_encode(file) {
//   return "data:image/png;base64," + fs.readFileSync(file, "base64");
// }

Rout.put("/updateProfile", upload.single("myfile"), async (req, res) => {
  try {
    const useInfo = req.body;
    const { email } = useInfo;

    console.log(useInfo);

    const resizedImageBuf = await require("sharp")(req.file.path)
      .resize(400)
      .webp({ quality: 80 })
      .toBuffer();

    useInfo.Avatar = `data:image/png;base64,${resizedImageBuf.toString(
      "base64"
    )}`;

    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
    const options = { upsert: true };

    useInfo.password = await bcrypt.hash(useInfo.password, 6);

    const UserAlreadyPresent = await userData.updateOne(
      { email: email },
      { $set: { ...useInfo } },
      options
    );

    //     const data = await userData.create(useInfo);

    const project = await ProjectSchema.updateMany(
      { email: email },
      { $set: { ...useInfo } },
      options
    );
    const public = await PublicSchema.updateMany(
      { email: email },
      { $set: { ...useInfo } },
      options
    );

    // console.log(data);

    res.status(202).json({ massege: "Profile Update sucess Full" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = Rout;
