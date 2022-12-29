const Rout = require("express").Router();

const PublicSchema = require("../modules/PublicProjectSchema");

Rout.put("/public/Project/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = req.body;
    console.log(updateData);
    const allProject = await PublicSchema.findByIdAndUpdate(
      { _id },
      { $set: req.body },
      function (err, docs) {
        if (err) {
          console.log(err);
          res.status(500).json({ massege: "somthis is wrong" });
        } else {
          //   console.log("Updated User : ", docs);
          res.status(200).json({ massege: "resource updated successfully" });
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;
