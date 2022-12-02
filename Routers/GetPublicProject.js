const Rout = require("express").Router();

const PublicSchema = require("../modules/PublicProjectSchema");

Rout.get("/allProject/:page", async (req, res) => {
  try {
    const pageNum = req.params.page;

    // console.log(pageNum);

    const allProject = await PublicSchema.find({})
      .sort({ createdAt: "desc" })
      .skip(+pageNum * 9)
      .limit(9);

    const total = await PublicSchema.countDocuments();

    // allProject = [...allProject].reverse();

    // console.log(typeof allProject);

    res.status(200).json({ allProject, total: total });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
