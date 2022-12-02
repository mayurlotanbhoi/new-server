const Rout = require("express").Router();
const PublicSchema = require("../modules/PublicProjectSchema");

Rout.post("/public", async (req, res) => {
  try {
    const project = req.body;
    const data = await PublicSchema.create(project);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
