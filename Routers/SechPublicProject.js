const Rout = require("express").Router();

const PublicSchema = require("../modules/PublicProjectSchema");

Rout.get("/serchProject/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // console.log(email);

    const allProject = await PublicSchema.find({ email });
    const total = await PublicSchema.find({ email }).count();

    // console.log(allProject);
    // console.log(total);

    res.status(200).json({ allProject, total: total });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
