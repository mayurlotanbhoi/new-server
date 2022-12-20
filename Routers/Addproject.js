const Rout = require("express").Router();
const ProjectSchema = require("../modules/ProjectSheama");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "./public/projectPhotos");
  },
  filename: (req, file, cd) => {
    let uniqueFileName =
      file.originalname + Date.now() + path.extname(file.originalname);

    cd(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

function base64_encode(file) {
  return "data:image/png;base64," + fs.readFileSync(file, "base64");
}

Rout.post("/projectadd", upload.single("myfile"), async (req, res) => {
  try {
    const projext = req.body;
    const email = projext.email;
    //     console.log(projext);

    const projectItems = { ...projext };

    projectItems.Photo = base64_encode(`./${req.file.path}`);
    projectItems.accessibility = "PRIVET";

    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.log(error);
      }
    });

    // console.log(projectItems);

    const project = await ProjectSchema.updateOne(
      { email },
      {
        $push: {
          projectDetails: projectItems,
        },
      }
    );

    //   project.projectDetails.push(projext);

    res.status(201).json({ massege: "uppdate  sussesfull" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
